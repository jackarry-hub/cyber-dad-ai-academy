import type {
  CurrentWrongQuestion,
  MistakeRecord,
  PracticeRecord,
  Question,
} from "../types/question";

const PRACTICE_RECORDS_KEY = "cyber_dad_practice_records";
const MISTAKE_RECORDS_KEY = "cyber_dad_mistake_records";
const CURRENT_WRONG_QUESTION_KEY = "cyber_dad_current_wrong_question";
const IMPORTED_QUESTIONS_KEY = "cyber_dad_imported_questions";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage may be unavailable in private mode or quota-limited.
  }
}

export function savePracticeRecord(record: PracticeRecord) {
  const records = getPracticeRecords();
  writeJson(PRACTICE_RECORDS_KEY, [record, ...records]);
}

export function getPracticeRecords(): PracticeRecord[] {
  const records = readJson<PracticeRecord[]>(PRACTICE_RECORDS_KEY, []);
  return Array.isArray(records) ? records : [];
}

export function saveMistakeRecord(record: MistakeRecord) {
  const records = getMistakeRecords();
  const withoutDuplicate = records.filter(
    (item) => item.question.id !== record.question.id,
  );
  writeJson(MISTAKE_RECORDS_KEY, [record, ...withoutDuplicate]);
}

export function getMistakeRecords(): MistakeRecord[] {
  const records = readJson<MistakeRecord[]>(MISTAKE_RECORDS_KEY, []);
  return Array.isArray(records) ? records : [];
}

export function saveImportedQuestions(questions: Question[]) {
  writeJson(IMPORTED_QUESTIONS_KEY, questions);
}

export function getImportedQuestions(): Question[] {
  const questions = readJson<Question[]>(IMPORTED_QUESTIONS_KEY, []);
  return Array.isArray(questions) ? questions : [];
}

export function clearImportedQuestions() {
  if (!canUseStorage()) return;

  try {
    window.localStorage.removeItem(IMPORTED_QUESTIONS_KEY);
  } catch {
    // Keep the page stable if storage cleanup fails.
  }
}

export function saveCurrentWrongQuestion(record: CurrentWrongQuestion) {
  writeJson(CURRENT_WRONG_QUESTION_KEY, record);
}

export function getCurrentWrongQuestion(): CurrentWrongQuestion | null {
  return readJson<CurrentWrongQuestion | null>(CURRENT_WRONG_QUESTION_KEY, null);
}

export function clearCurrentWrongQuestion() {
  if (!canUseStorage()) return;

  try {
    window.localStorage.removeItem(CURRENT_WRONG_QUESTION_KEY);
  } catch {
    // Keep the page stable if storage removal fails.
  }
}

export function clearLearningData() {
  if (!canUseStorage()) return;

  try {
    window.localStorage.removeItem(PRACTICE_RECORDS_KEY);
    window.localStorage.removeItem(MISTAKE_RECORDS_KEY);
    window.localStorage.removeItem(CURRENT_WRONG_QUESTION_KEY);
  } catch {
    // Keep the page stable if storage cleanup fails.
  }
}
