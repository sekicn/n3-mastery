
export enum GrammarCategory {
  CORE = 'CORE',
  ADVANCED = 'ADVANCED'
}

export type GrammarStyle = '口语' | '书面' | '通用' | '正式';

export interface GrammarItem {
  id: string;
  lesson: number;
  pattern: string;
  function: string;
  connection: string;
  exampleJP: string;
  exampleCN: string;
  category: GrammarCategory;
  style: GrammarStyle;
  spokenAlternative?: string;
}

export interface UserProgress {
  itemId: string;
  level: number; // 0 to 5 (用于大致分级)
  masteryScore: number; // 0-100 (具体的掌握百分比)
  stability: number; // 稳定性：决定复习间隔的权重
  difficulty: number; // 难度系数：AI 根据用户表现动态调整 (0.1 - 2.0)
  nextReviewDate: number;
  lastTestedDate: number;
  consecutiveCorrect: number;
  historyScores: number[]; // 记录最近三次 AI 评分
}

export interface AppState {
  dailyGoal: number;
  studiedToday: string[];
  progress: Record<string, UserProgress>;
  lastAccessDate: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  grammarId: string;
}
