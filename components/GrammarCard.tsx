
import React, { useState } from 'react';
import { GrammarItem } from '../types';
import { getGrammarNuance } from '../services/geminiService';

interface GrammarCardProps {
  item: GrammarItem;
  onDone: () => void;
  hideDoneButton?: boolean;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({ item, onDone, hideDoneButton = false }) => {
  const [nuance, setNuance] = useState<string | null>(null);
  const [loadingNuance, setLoadingNuance] = useState(false);

  const fetchNuance = async () => {
    setLoadingNuance(true);
    try {
      const text = await getGrammarNuance(item);
      setNuance(text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingNuance(false);
    }
  };

  const styleColors = {
    '口语': 'bg-pink-100 text-pink-700 border-pink-200',
    '书面': 'bg-blue-100 text-blue-700 border-blue-200',
    '通用': 'bg-slate-100 text-slate-700 border-slate-200',
    '正式': 'bg-indigo-100 text-indigo-700 border-indigo-200'
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl p-8 sm:p-12 w-full mx-auto border border-slate-50 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-3">
          <span className={`px-4 py-1 rounded-xl text-xs font-black border uppercase tracking-widest ${styleColors[item.style]}`}>
            {item.style}
          </span>
          <span className="px-4 py-1 bg-slate-50 text-slate-400 rounded-xl text-xs font-black border border-slate-100">
            第 {item.lesson} 课
          </span>
        </div>
        <button 
          onClick={fetchNuance}
          disabled={loadingNuance}
          className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors font-black flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:scale-125 transition-transform">💡</span>
          {loadingNuance ? 'AI 深度分析中...' : '查看语感深度解析'}
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-5xl sm:text-6xl font-black text-slate-900 mb-4 font-noto-sans-jp tracking-tighter leading-tight">{item.pattern}</h2>
        <p className="text-2xl sm:text-3xl text-indigo-600 font-black mb-10 leading-tight">{item.function}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">如何接续</p>
            <p className="text-slate-800 font-bold text-xl font-noto-sans-jp leading-relaxed">{item.connection}</p>
          </div>

          {item.spokenAlternative && (
            <div className="bg-amber-50 p-8 rounded-[2rem] border-2 border-amber-100/50">
              <p className="text-[10px] font-black text-amber-600 mb-3 uppercase tracking-[0.2em]">💬 口语建议平替</p>
              <p className="text-amber-900 font-black text-xl sm:text-2xl">{item.spokenAlternative}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 mb-12">
        <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">经典例句</p>
          <p className="text-2xl sm:text-3xl text-slate-900 mb-4 font-noto-sans-jp font-bold leading-relaxed">{item.exampleJP}</p>
          <p className="text-lg text-slate-500 font-medium">{item.exampleCN}</p>
        </div>

        {nuance && (
          <div className="bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] text-white shadow-2xl animate-in zoom-in-95 duration-500 relative">
            <div className="absolute top-6 right-8 text-indigo-400 font-black text-[10px] tracking-widest uppercase opacity-50">AI Expert Report</div>
            <p className="text-[10px] font-black opacity-40 mb-4 uppercase tracking-[0.3em]">深度语感分析</p>
            <p className="text-lg font-medium leading-[1.8] italic opacity-95">{nuance}</p>
          </div>
        )}
      </div>

      {!hideDoneButton && (
        <button 
          onClick={onDone}
          className="w-full py-8 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95"
        >
          我已掌握要点，进入下一步测试
        </button>
      )}
    </div>
  );
};
