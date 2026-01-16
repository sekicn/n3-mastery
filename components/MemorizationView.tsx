
import React, { useState } from 'react';
import { GrammarItem } from '../types';
import { evaluateMemorization, MemorizationFeedback } from '../services/geminiService';

interface MemorizationViewProps {
  item: GrammarItem;
  onResult: (score: number) => void;
}

export const MemorizationView: React.FC<MemorizationViewProps> = ({ item, onResult }) => {
  const [userPattern, setUserPattern] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [feedback, setFeedback] = useState<MemorizationFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userPattern.trim() || !userSentence.trim()) return;
    setLoading(true);
    try {
      const res = await evaluateMemorization(item, userPattern, userSentence);
      setFeedback(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl p-10 max-w-2xl mx-auto border border-slate-50 animate-in fade-in zoom-in duration-500">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">认知固化挑战 (AI 实时测评)</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-8 rounded-3xl border-l-8 border-amber-400 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">中文含义提示</p>
            <h2 className="text-3xl font-black text-slate-800 leading-tight">{item.function}</h2>
          </div>
        </div>
      </div>

      {!feedback ? (
        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">1. 请输入日语语法模式</label>
            <input 
              type="text" 
              value={userPattern}
              onChange={(e) => setUserPattern(e.target.value)}
              placeholder="请输入您记住的语法..."
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-400 focus:ring-4 focus:ring-amber-50 focus:outline-none transition-all font-noto-sans-jp text-xl"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">2. 挑战造句 (AI 将评估您的地道程度)</label>
            <textarea 
              rows={4}
              value={userSentence}
              onChange={(e) => setUserSentence(e.target.value)}
              placeholder="输入完整的日语例句..."
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-400 focus:ring-4 focus:ring-amber-50 focus:outline-none transition-all font-noto-sans-jp text-xl resize-none leading-relaxed"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !userPattern.trim() || !userSentence.trim()}
            className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl ${
              loading || !userPattern.trim() || !userSentence.trim()
                ? 'bg-slate-100 text-slate-300'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100 active:scale-95'
            }`}
          >
            {loading ? 'AI 老师正在深度分析语义...' : '提交背诵并获取 AI 评分'}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
          <div className={`p-8 rounded-[2.5rem] border-2 shadow-2xl ${feedback.score >= 80 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">AI 综合掌握得分</p>
                <h3 className={`text-6xl font-black ${feedback.score >= 80 ? 'text-emerald-600' : 'text-rose-600'}`}>{feedback.score}</h3>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="text-[10px] font-black text-emerald-600">语法: {feedback.metrics.grammarAccuracy}%</span>
                <span className="text-[10px] font-black text-indigo-600">语境: {feedback.metrics.contextAppropriateness}%</span>
                <span className="text-[10px] font-black text-pink-600">自然度: {feedback.metrics.naturalness}%</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">AI 深度点评</p>
                <p className="text-lg font-bold text-slate-800 leading-relaxed font-noto-sans-jp">{feedback.feedback}</p>
              </div>
              
              {feedback.suggestedCorrection && (
                <div className="bg-white/80 backdrop-blur p-6 rounded-3xl border border-white shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">更地道的推荐表达</p>
                  <p className="text-2xl font-noto-sans-jp font-black text-indigo-600 leading-relaxed">{feedback.suggestedCorrection}</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onResult(feedback.score)}
            className="w-full py-6 bg-slate-900 hover:bg-black text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-2xl active:scale-95"
          >
            确认评分并继续
          </button>
        </div>
      )}
    </div>
  );
};
