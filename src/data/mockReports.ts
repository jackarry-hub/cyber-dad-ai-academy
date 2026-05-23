import type { LearningReport } from "../types/report";

export const mockReport: LearningReport = {
  todayMinutes: 38,
  completedQuestions: 18,
  accuracy: 78,
  streakDays: 6,
  weakPoints: ["分数通分", "移项变号", "函数交点"],
  aiSuggestions: [
    "先用 10 道基础题巩固分数通分，再做 3 道应用题。",
    "讲题时说清每一步为什么变形，减少跳步。",
    "把错题按错因标签整理，每晚复盘 8 分钟。",
  ],
  goalText: "今天再完成 6 道数学题，冲刺 80% 正确率。",
};
