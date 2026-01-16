
import React, { useState, useMemo } from 'react';
import { GrammarItem, UserProgress } from '../types';

interface LibraryViewProps {
  items: GrammarItem[];
  progress: Record<string, UserProgress>;
  onSelectItem: (item: GrammarItem) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ items, progress, onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = 
        item.pattern.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.function.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStyle = filterStyle === 'all' || item.style === filterStyle;
      return matchesSearch && matchesStyle;
    });
  }, [items, searchTerm, filterStyle]);

  const styleColors = {
    '口语': 'text-pink-600 bg-pink-50',
    '书面': 'text-blue-600 bg-blue-50',
    '通用': 'text-slate-600 bg-slate-50',
    '正式': 'text-indigo-600 bg-indigo-50'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full relative">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="搜索语法或功能含义..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 focus:outline-none transition-all font-bold text-slate-700"
          />
        </div>
        <div className="flex gap-2">
          {['all', '口语', '书面', '通用', '正式'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStyle(s)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStyle === s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
            >
              {s === 'all' ? '全部类型' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const p = progress[item.id];
          const mastery = p?.masteryScore || 0;
          return (
            <div 
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${styleColors[item.style]}`}>
                    {item.style}
                  </span>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">熟练度</p>
                    <span className="text-sm font-black text-slate-800">{mastery}%</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-3 font-noto-sans-jp group-hover:text-indigo-600 transition-colors">{item.pattern}</h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.function}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">第 {item.lesson} 课</span>
                <div className="w-20 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${mastery > 80 ? 'bg-emerald-500' : mastery > 40 ? 'bg-indigo-500' : 'bg-slate-200'}`}
                    style={{ width: `${mastery}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-300 font-black text-xl italic">未能找到匹配的语法，尝试更换关键词...</p>
        </div>
      )}
    </div>
  );
};
