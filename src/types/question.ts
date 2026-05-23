export type PracticeStage =
  | "preschool"
  | "primaryLower"
  | "primaryUpper"
  | "middle"
  | "high"
  | "career";
export type QuestionType = "single-choice" | "fill-blank";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface QuestionBankItem {
  stem: string;
  options: string[];
  answer: string;
  explanation: string;
  knowledgePoints: string[];
}

export interface QuestionBank {
  id: string;
  title: string;
  stage: PracticeStage;
  grade: string;
  subject: string;
  difficulty: QuestionDifficulty;
  recommendedMinutes: number;
  questions: QuestionBankItem[];
}

export interface Question {
  id: string;
  bankId: string;
  bankTitle: string;
  recommendedMinutes: number;
  stage: PracticeStage;
  grade: string;
  subject: string;
  knowledgePoint: string;
  knowledgePoints: string[];
  type: QuestionType;
  difficulty: QuestionDifficulty;
  stem: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface PracticeRecord {
  id: string;
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  createdAt: string;
}

export interface AiAnalysis {
  reasonTag: string;
  wrongStep: string;
  correctThinking: string;
  suggestion: string;
  variantTraining: string;
}

export interface MistakeRecord {
  id: string;
  question: Question;
  selectedAnswer: string;
  correctAnswer: string;
  studentExplanation: string;
  aiAnalysis: AiAnalysis;
  createdAt: string;
}

export interface CurrentWrongQuestion {
  id: string;
  question: Question;
  selectedAnswer: string;
  correctAnswer: string;
  createdAt: string;
}
