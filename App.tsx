
import React, { useState, useEffect, useMemo } from 'react';
import { AppState, GrammarItem, QuizQuestion, UserProgress } from './types';
import { GRAMMAR_DATA } from './constants.tsx';
import { MasteryChart } from './components/MasteryChart';
import { GrammarCard } from './components/GrammarCard';
import { QuizView } from './components/QuizView';
import { MemorizationView } from './components/MemorizationView';
import { LibraryView } from './components/LibraryView';
import { generateQuizBatch } from './services/geminiService';

const STORAGE_KEY = 'n3_mastery_ai_v2';

// --- 认知稳定性算法配置 ---
const DEFAULT_PROGRESS: Partial<UserProgress> = {
  level: 1,
  masteryScore: 0,
  stability: 1.0,
  difficulty: 1.0,
  consecutiveCorrect: 0,
  historyScores: []
};

const calculateNewProgress = (current: UserProgress, stageScore: number, isProduction: boolean): UserProgress => {
  let newDifficulty = current.difficulty;
  if (stageScore < 70) newDifficulty = Math.min(2.0, current.difficulty + 0.15);
  if (stageScore > 90) newDifficulty = Math.max(0.5, current.difficulty - 0.05);

  const weight = isProduction ? 1.5 : 0.5;
  const performanceFactor = (stageScore / 80) * (2.0 - newDifficulty);
  let newStability = current.stability * (1.0 + (performanceFactor - 1.0) * weight);
  newStability = Math.max(0.1, Math.min(100, newStability));

  const intervalDays = Math.max(1, Math.round(newStability * (1 / newDifficulty)));
  const newMastery = Math.round((current.masteryScore * 0.4) + (stageScore * 0.6));

  return {
    ...current,
    masteryScore: newMastery,
    stability: newStability,
    difficulty: newDifficulty,
    nextReviewDate: Date.now() + intervalDays * 24 * 60 * 60 * 1000,
    lastTestedDate: Date.now(),
    consecutiveCorrect: stageScore >= 70 ? current.consecutiveCorrect + 1 : 0,
    historyScores: [stageScore, ...current.historyScores].slice(0, 5),
    level: Math.ceil(newMastery / 20)
  };
};

const StatCard = ({ label, value, subValue, icon, colorClass }: { label: string, value: string | number, subValue?: string, icon: string, colorClass: string }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm ${colorClass}`}>
        {icon}
      </div>
      {subValue && <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{subValue}</span>}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
  </div>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      dailyGoal: 5,
      studiedToday: [],
      progress: {},
      lastAccessDate: new Date().toISOString().split('T')[0]
    };
  });

  const [view, setView] = useState<'dashboard' | 'session' | 'library'>('dashboard');
  const [subStage, setSubStage] = useState<'exposure' | 'quiz' | 'production'>('exposure');
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const [sessionItems, setSessionItems] = useState<GrammarItem[]>([]);
  const [questionCache, setQuestionCache] = useState<Record<string, QuizQuestion>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(0);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<GrammarItem | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const stats = useMemo(() => {
    const items = Object.values(state.progress);
    const totalMastery = items.reduce((acc, p) => acc + p.masteryScore, 0);
    const avgStability = items.reduce((acc, p) => acc + p.stability, 0) / (items.length || 1);
    
    const distribution = [0, 0, 0, 0, 0];
    items.forEach(p => {
      const idx = Math.min(4, Math.max(0, p.level - 1));
      distribution[idx]++;
    });

    return {
      mastery: Math.round(totalMastery / GRAMMAR_DATA.length),
      learnedCount: items.length,
      stability: avgStability.toFixed(1),
      distribution
    };
  }, [state.progress]);

  const reviewQueue = useMemo(() => {
    const now = Date.now();
    return GRAMMAR_DATA.filter(item => {
      const p = state.progress[item.id];
      return p && p.nextReviewDate <= now && p.masteryScore < 95;
    }).sort((a, b) => (state.progress[a.id]?.nextReviewDate || 0) - (state.progress[b.id]?.nextReviewDate || 0));
  }, [state.progress]);

  const newItems = useMemo(() => {
    return GRAMMAR_DATA.filter(item => !state.progress[item.id]).slice(0, state.dailyGoal);
  }, [state.progress, state.dailyGoal]);

  const startMasterySession = async () => {
    setIsLoading(true);
    const items = [...reviewQueue, ...newItems].slice(0, 8);
    if (items.length === 0) {
      alert("恭喜！今日所有目标均已达成。");
      setIsLoading(false); return;
    }
    setSessionItems(items);
    setActiveItemIdx(0);
    setSubStage('exposure');
    try {
      const batch = await generateQuizBatch(items.slice(0, 4));
      setQuestionCache(batch);
      setView('session');
    } catch (e) {
      setView('session');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextSubStage = () => {
    if (subStage === 'exposure') {
      setQuizStartTime(Date.now());
      setSubStage('quiz');
    } else if (subStage === 'quiz') {
      setSubStage('production');
    } else {
      if (activeItemIdx < sessionItems.length - 1) {
        const nextIdx = activeItemIdx + 1;
        setActiveItemIdx(nextIdx);
        setSubStage('exposure');
        const nextPreload = sessionItems[nextIdx + 3];
        if (nextPreload && !questionCache[nextPreload.id]) {
          generateQuizBatch([nextPreload]).then(q => setQuestionCache(p => ({...p, ...q})));
        }
      } else {
        setView('dashboard');
      }
    }
  };

  const handleStageResult = (result: boolean | number) => {
    const item = sessionItems[activeItemIdx];
    let score = 0;

    if (subStage === 'quiz') {
      const timeTaken = (Date.now() - quizStartTime) / 1000;
      if (result === true) {
        score = timeTaken < 5 ? 100 : (timeTaken < 15 ? 85 : 70);
      } else {
        score = 0;
      }
    } else if (subStage === 'production') {
      score = typeof result === 'number' ? result : (result ? 85 : 0);
    }

    setState(prev => {
      const currentProgress = prev.progress[item.id] || { ...DEFAULT_PROGRESS, itemId: item.id } as UserProgress;
      const updated = calculateNewProgress(currentProgress, score, subStage === 'production');
      return {
        ...prev,
        studiedToday: Array.from(new Set([...prev.studiedToday, item.id])),
        progress: { ...prev.progress, [item.id]: updated }
      };
    });

    handleNextSubStage();
  };

  const masteryData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      date: `${i + 1}日`,
      mastery: Math.max(0, stats.mastery - (6 - i) * 1.5 + Math.random() * 2)
    }));
  }, [stats.mastery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-inter">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl rotate-3">N3</div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none">Mastery Pro</h1>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em] mt-1">AI Cognitive Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-4">
            <nav className="flex items-center gap-1 mr-4 border-r border-slate-100 pr-4">
              <button 
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'dashboard' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                掌握看板
              </button>
              <button 
                onClick={() => setView('library')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'library' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                语法全集
              </button>
            </nav>
            <div className="hidden lg:block text-right">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">全局掌握索引</p>
              <div className="w-32 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden border border-slate-50 p-0.5">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${stats.mastery}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {isLoading && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center font-black text-indigo-600 text-sm">AI</div>
            </div>
            <p className="mt-8 text-slate-800 font-black text-xl tracking-tight">AI 引擎正在计算您的遗忘概率...</p>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard label="掌握指数" value={`${stats.mastery}%`} icon="🎯" colorClass="bg-indigo-50 text-indigo-600" subValue="Mastery Index" />
              <StatCard label="内化语法" value={stats.learnedCount} icon="🧠" colorClass="bg-emerald-50 text-emerald-600" subValue={`${GRAMMAR_DATA.length} Total`} />
              <StatCard label="认知稳定性" value={stats.stability} icon="🛡️" colorClass="bg-amber-50 text-amber-500" subValue="Stability" />
              <StatCard label="待激活项" value={reviewQueue.length} icon="⚡" colorClass="bg-rose-50 text-rose-500" subValue="Review Queue" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                  <MasteryChart data={masteryData} />
                </div>
                
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">熟练等级分布</p>
                      <h4 className="text-xl font-black text-slate-800">Mastery Distribution</h4>
                    </div>
                  </div>
                  <div className="flex items-end gap-3 h-32">
                    {stats.distribution.map((count, i) => {
                      const percentage = stats.learnedCount > 0 ? (count / stats.learnedCount) * 100 : 0;
                      const colors = ['bg-slate-100', 'bg-indigo-200', 'bg-indigo-400', 'bg-indigo-600', 'bg-slate-900'];
                      const labels = ['入门', '初识', '熟练', '精通', '化境'];
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center group">
                          <div className="w-full relative flex flex-col justify-end h-full">
                            <div 
                              className={`w-full ${colors[i]} rounded-xl transition-all duration-1000 group-hover:brightness-110 shadow-sm`} 
                              style={{ height: `${Math.max(8, percentage)}%` }}
                            />
                          </div>
                          <span className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">{labels[i]}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex-1 flex flex-col">
                  <div className="relative z-10 flex-1">
                    <h2 className="text-3xl font-black mb-4 leading-tight">准备好开启<br/>深度学习了吗？</h2>
                    <p className="text-slate-400 font-medium mb-10 text-sm leading-relaxed">
                      AI 引擎锁定了 <span className="text-white font-bold">{reviewQueue.length}</span> 个遗忘高危项。
                    </p>
                  </div>
                  <button 
                    onClick={startMasterySession}
                    className="w-full py-6 bg-white hover:bg-indigo-50 text-slate-900 rounded-2xl font-black text-lg shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 relative z-10"
                  >
                    <span>开始掌握任务</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">AI 学习建议</p>
                  <p className="text-slate-600 font-bold text-sm leading-relaxed italic">
                    "您的语法稳定性良好。建议在【语法全集】中查看标记为‘入门’的项并进行预览。"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'library' && (
          <LibraryView 
            items={GRAMMAR_DATA} 
            progress={state.progress} 
            onSelectItem={(item) => setSelectedLibraryItem(item)} 
          />
        )}

        {view === 'session' && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {if(confirm("任务尚未完成，确认退出？")) setView('dashboard')}}
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div>
                  <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.3em]">Training Session</h3>
                  <p className="font-black text-slate-800">第 {activeItemIdx + 1} / {sessionItems.length} 项</p>
                </div>
              </div>
              <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm gap-2">
                {['exposure', 'quiz', 'production'].map((s, idx) => (
                  <div key={s} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${subStage === s ? 'bg-indigo-600 text-white' : 'text-slate-300'}`}>
                    {idx + 1}. {s === 'exposure' ? '认知唤醒' : s === 'quiz' ? '辨析反应' : '认知固化'}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[500px]">
              {subStage === 'exposure' && <GrammarCard item={sessionItems[activeItemIdx]} onDone={handleNextSubStage} />}
              {subStage === 'quiz' && <QuizView item={sessionItems[activeItemIdx]} question={questionCache[sessionItems[activeItemIdx].id]} onResult={(res) => handleStageResult(res)} />}
              {subStage === 'production' && <MemorizationView item={sessionItems[activeItemIdx]} onResult={(res) => handleStageResult(res)} />}
            </div>
          </div>
        )}

        {/* 详情浮层 */}
        {selectedLibraryItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedLibraryItem(null)} />
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
              <button 
                onClick={() => setSelectedLibraryItem(null)}
                className="absolute top-8 right-8 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <GrammarCard item={selectedLibraryItem} onDone={() => setSelectedLibraryItem(null)} hideDoneButton />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
