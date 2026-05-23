export interface LearningReport {
  todayMinutes: number;
  completedQuestions: number;
  accuracy: number;
  streakDays: number;
  weakPoints: string[];
  aiSuggestions: string[];
  goalText: string;
}
