
import { GoogleGenAI, Type } from "@google/genai";
import { GrammarItem, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface MemorizationFeedback {
  score: number; // 综合分 0-100
  metrics: {
    grammarAccuracy: number; // 语法准确度 0-100
    contextAppropriateness: number; // 语境契合度 0-100
    naturalness: number; // 表达自然度 0-100
  };
  patternCorrect: boolean;
  feedback: string;
  suggestedCorrection?: string;
}

export const generateQuizBatch = async (items: GrammarItem[]): Promise<Record<string, QuizQuestion>> => {
  const itemsPrompt = items.map((item, idx) => `
    题目 ${idx + 1} (ID: ${item.id}):
    - 语法点: ${item.pattern}
    - 含义: ${item.function}
    - 接续: ${item.connection}
    - 类型: ${item.style}
    ${item.spokenAlternative ? `- 口语平替参考: ${item.spokenAlternative}` : ''}
  `).join('\n');

  const prompt = `
    你是一位资深的日语教学专家。请为以下 ${items.length} 个 N3 语法点分别生成一道高质量的单选题。
    设计对话场景，若是书面语点则设计正式讨论场景。
    干扰项需具备 N3 辨析度。全中文解析，字数 80-120 字。
    返回 JSON 格式数组，包含字段：grammarId, question, options, correctAnswerIndex, explanation。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            grammarId: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, minItems: 4, maxItems: 4 },
            correctAnswerIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["grammarId", "question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    }
  });

  const results: QuizQuestion[] = JSON.parse(response.text);
  const cache: Record<string, QuizQuestion> = {};
  results.forEach(q => {
    cache[q.grammarId] = q;
  });
  return cache;
};

export const evaluateMemorization = async (
  grammar: GrammarItem, 
  userPattern: string, 
  userSentence: string
): Promise<MemorizationFeedback> => {
  const prompt = `
    作为日语老师，请评价中国学生对 N3 语法点 "${grammar.pattern}" 的产出练习。
    学生尝试背诵的语法：${userPattern}
    学生输入的造句：${userSentence}
    
    请严格按照以下指标打分：
    1. grammarAccuracy (语法准确度): 语法模式及接续是否无误。
    2. contextAppropriateness (语境契合度): 在此语境下使用该语法是否得当。
    3. naturalness (自然度): 句子是否像日本人说的。
    
    返回 JSON 对象。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          metrics: {
            type: Type.OBJECT,
            properties: {
              grammarAccuracy: { type: Type.NUMBER },
              contextAppropriateness: { type: Type.NUMBER },
              naturalness: { type: Type.NUMBER }
            },
            required: ["grammarAccuracy", "contextAppropriateness", "naturalness"]
          },
          patternCorrect: { type: Type.BOOLEAN },
          feedback: { type: Type.STRING },
          suggestedCorrection: { type: Type.STRING }
        },
        required: ["score", "metrics", "patternCorrect", "feedback"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getGrammarNuance = async (grammar: GrammarItem): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请用简体中文解释 N3 语法 "${grammar.pattern}" 的语感及使用陷阱，200字以内。`,
  });
  return response.text;
};
