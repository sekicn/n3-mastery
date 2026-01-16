
import { GoogleGenAI, Type } from "@google/genai";
import { GrammarItem, QuizQuestion } from "../types";

/**
 * Google Gemini API 服务实现
 * 使用 gemini-3-flash-preview 模型。
 * API Key 严格从 process.env.API_KEY 获取。
 */

// Initialize the Google GenAI client
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

/**
 * 生成一组语法练习题
 */
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
    请为以下 ${items.length} 个 N3 语法点分别生成一道高质量的单选题。
    要求：
    1. 设计对话场景（A/B对话形式）。
    2. 干扰项需具备 N3 辨析度。
    3. 全中文解析，包含该语法的使用要点。
    
    待处理语法点列表：
    ${itemsPrompt}
  `;

  try {
    // Fixed: Using ai.models.generateContent with responseSchema for robust JSON extraction
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: '你是一位精通日语教学的专家。请生成单选题。',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              grammarId: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
            },
            required: ["grammarId", "question", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    const results: QuizQuestion[] = JSON.parse(response.text || '[]');
    const cache: Record<string, QuizQuestion> = {};
    results.forEach(q => {
      cache[q.grammarId] = q;
    });
    return cache;
  } catch (error) {
    console.error("Quiz Generation Failed:", error);
    throw error;
  }
};

/**
 * 评估学生的背诵和造句
 */
export const evaluateMemorization = async (
  grammar: GrammarItem, 
  userPattern: string, 
  userSentence: string
): Promise<MemorizationFeedback> => {
  const prompt = `
    作为日语老师，请评价学生对 N3 语法点 "${grammar.pattern}" 的练习。
    学生尝试背诵的语法：${userPattern}
    学生输入的例句：${userSentence}
    
    评分指标（0-100）：
    1. grammarAccuracy (语法接续和形态准确性)
    2. contextAppropriateness (该语法在此场景下是否贴切)
    3. naturalness (句子是否地道、流畅)
  `;

  try {
    // Fixed: Using ai.models.generateContent with responseSchema for structured evaluation
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: '你是一位资深的日语教学专家。',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            metrics: {
              type: Type.OBJECT,
              properties: {
                grammarAccuracy: { type: Type.NUMBER },
                contextAppropriateness: { type: Type.NUMBER },
                naturalness: { type: Type.NUMBER },
              },
              required: ["grammarAccuracy", "contextAppropriateness", "naturalness"]
            },
            patternCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
            suggestedCorrection: { type: Type.STRING },
          },
          required: ["score", "metrics", "patternCorrect", "feedback"]
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Evaluation Failed:", error);
    throw error;
  }
};

/**
 * 获取语法点的深度语感解析
 */
export const getGrammarNuance = async (grammar: GrammarItem): Promise<string> => {
  const prompt = `请用简体中文简明扼要地解释 N3 语法 "${grammar.pattern}" 的语感特征、使用限制以及常见的错误陷阱，200字以内。`;
  try {
    // Fixed: Direct access to response.text property
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: '你是一位资深的日语教学专家。'
      }
    });
    return response.text || "暂时无法获取语感解析。";
  } catch (error) {
    console.error("Nuance Fetch Failed:", error);
    return "暂时无法获取语感解析。";
  }
};
