import React, { useState } from 'react';
import { GrammarItem, QuizQuestion } from '../types';

interface QuizViewProps {
  item: GrammarItem;
  question: QuizQuestion | null;
  onResult: (correct: boolean) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ item, question, onResult }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!question) {
    return (
      <div className="bg-white rounded-[3rem] shadow-2xl p-20 max-w-3xl mx-auto border border-slate-100 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
        <p className="text-slate-400 font-bold text-sm">正在后台全力调取题目...</p>
      </div>
    );
  }

  const handleChoice = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setSubmitted(true);
  };

  const isCorrect = selectedIdx === question.correctAnswerIndex;

  const renderTextWithBlank = (text: string) => {
    return text.split('____').map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && (
          <span className={`inline-block min-w-[100px] border-b-4 mx-2 text-center font-black transition-all ${
            submitted 
              ? (isCorrect ? 'text-emerald-600 border-emerald-600' : 'text-rose-600 border-rose-600') 
              : (selectedIdx !== null ? 'border-indigo-400 text-indigo-500 italic' : 'border-slate-200 text-transparent')
          }`}>
            {submitted ? question.options[question.correctAnswerIndex] : (selectedIdx !== null ? '...' : '____')}
          </span>
        )}
      </React.Fragment>
    ));
  };

  const renderFormattedQuestion = (fullText: string) => {
    // 识别对话模式，例如 "A：" 或 "A:"
    const lines = fullText.split(/(?=[A-Z]\s*[:：])/);
    
    if (lines.length > 1) {
      return (
        <div className="space-y-6 mb-10">
          {lines.map((line, idx) => {
            const match = line.match(/^([A-Z])\s*[:：]\s*(.*)$/);
            if (match) {
              const [, speaker, content] = match;
              return (
                <div key={idx} className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-500`} style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black shadow-sm ${
                    speaker === 'A' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {speaker}
                  </div>
                  <div className={`flex-1 relative p-5 rounded-3xl text-slate-700 font-noto-sans-jp text-lg leading-[1.8] shadow-sm border ${
                    speaker === 'A' ? 'bg-indigo-50/30 border-indigo-100' : 'bg-white border-slate-100'
                  }`}>
                    {renderTextWithBlank(content)}
                    <div className={`absolute top-4 -left-1.5 w-3 h-3 rotate-45 border-l border-b ${
                      speaker === 'A' ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-100'
                    }`}></div>
                  </div>
                </div>
              );
            }
            return <div key={idx} className="p-4 bg-slate-50 rounded-2xl text-slate-600 italic text-center text-sm mb-4">{renderTextWithBlank(line)}</div>;
          })}
        </div>
      );
    }

    return (
      <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border-2 border-slate-100 shadow-inner text-center">
        <h2 className="text-2xl font-black text-slate-800 leading-relaxed font-noto-sans-jp">
          {renderTextWithBlank(fullText)}
        </h2>
      </div>
    );
  };

  const getOptionStyle = (idx: number) => {
    const isThisSelected = selectedIdx === idx;
    const isThisCorrect = idx === question.correctAnswerIndex;

    if (submitted) {
      if (isThisCorrect) return 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md ring-2 ring-emerald-100';
      if (isThisSelected && !isThisCorrect) return 'border-rose-500 bg-rose-50 text-rose-700';
      return 'border-slate-100 text-slate-300 opacity-50';
    }

    if (isThisSelected) return 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-50 shadow-lg translate-x-1';
    return 'border-slate-200 hover:border-indigo-300 text-slate-600 hover:bg-slate-50';
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl p-10 max-w-3xl mx-auto border border-slate-100 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="font-black text-slate-800 tracking-wider">语法掌握度测试</h3>
        </div>
        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black shadow-sm italic">
          核心语法: {item.pattern}
        </span>
      </div>
      
      {renderFormattedQuestion(question.question)}

      <div className="grid grid-cols-1 gap-4 mb-12">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(idx)}
            disabled={submitted}
            className={`w-full p-6 rounded-2xl text-left border-2 transition-all duration-300 font-bold flex items-center group relative ${getOptionStyle(idx)}`}
          >
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 text-sm font-black mr-5 transition-all ${
              selectedIdx === idx 
                ? (submitted 
                    ? (idx === question.correctAnswerIndex ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                    : 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg'
                  )
                : (submitted && idx === question.correctAnswerIndex ? 'bg-emerald-500 border-emerald-500 text-white animate-bounce' : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-400')
            }`}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="flex-1 font-noto-sans-jp text-lg tracking-wide">{opt}</span>
          </button>
        ))}
      </div>

      {submitted && (
        <div className={`p-8 rounded-[2rem] mb-10 animate-in zoom-in-95 duration-500 border shadow-xl ${isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-100 shadow-emerald-50' : 'bg-rose-50 text-rose-900 border-rose-100 shadow-rose-50'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {isCorrect ? '👍' : '💡'}
            </div>
            <div>
              <p className="font-black text-[10px] uppercase tracking-widest opacity-60">{isCorrect ? '完美的掌握' : '学习新知识'}</p>
              <h4 className="font-black text-lg">{isCorrect ? '恭喜，回答完全正确！' : '老师的深度点拨'}</h4>
            </div>
          </div>
          <div className="text-base leading-relaxed font-medium opacity-90 pl-2 border-l-2 border-current/20 italic">
            {question.explanation}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIdx === null}
            className={`flex-1 py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${
              selectedIdx !== null 
                ? 'bg-slate-900 hover:bg-black text-white shadow-slate-300 active:scale-95' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            提交并查看解析
          </button>
        ) : (
          <button
            onClick={() => onResult(isCorrect)}
            className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-2xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>进入下一个语法点</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
        )}
      </div>
    </div>
  );
};