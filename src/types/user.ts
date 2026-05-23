import type { StageKey } from "./course";

export interface UserProfile {
  id: string;
  name: string;
  grade: string;
  stage: StageKey;
  level: string;
  points: number;
  streakDays: number;
  avatarText: string;
}
