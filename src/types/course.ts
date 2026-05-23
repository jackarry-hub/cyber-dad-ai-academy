export type StageKey = "bridge" | "primary" | "middle";

export type SubjectKey = "math" | "chinese" | "english" | "science" | "ai";

export interface Course {
  id: string;
  title: string;
  stage: StageKey;
  subject: SubjectKey;
  level: string;
  lessons: number;
  learners: string;
  rating: number;
  description: string;
  tags: string[];
  progress?: number;
}
