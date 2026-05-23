import type {
  PracticeStage,
  Question,
  QuestionDifficulty,
  QuestionType,
} from "../types/question";

type RowValue = string | number | boolean | null | undefined;
type ExcelRow = Record<string, RowValue>;

export interface ImportQuestionBankResult {
  questions: Question[];
  errors: string[];
}

const stageMap: Record<string, PracticeStage> = {
  幼小衔接: "preschool",
  小学低年级: "primaryLower",
  小学高年级: "primaryUpper",
  初中: "middle",
  高中: "high",
  成人职场: "career",
};

const difficultyMap: Record<string, QuestionDifficulty> = {
  基础: "easy",
  提升: "medium",
  困难: "hard",
};

const typeMap: Record<string, QuestionType> = {
  选择题: "single-choice",
  填空题: "fill-blank",
};

const requiredFields = [
  "学段",
  "年级",
  "学科",
  "套题名称",
  "知识点",
  "难度",
  "题型",
  "题干",
  "正确答案",
  "解析",
];

export async function parseQuestionBankWorkbook(buffer: ArrayBuffer): Promise<ImportQuestionBankResult> {
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = sheetName ? workbook.Sheets[sheetName] : null;

  if (!worksheet) {
    return { questions: [], errors: ["未找到可读取的工作表"] };
  }

  const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
    defval: "",
    raw: false,
  });

  const errors: string[] = [];
  const questions: Question[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const rowErrors = validateRow(row, rowNumber);

    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
      return;
    }

    const stageText = readCell(row, "学段");
    const difficultyText = readCell(row, "难度");
    const typeText = readCell(row, "题型");
    const type = typeMap[typeText];
    const bankTitle = readCell(row, "套题名称");
    const knowledgePoints = splitKnowledgePoints(readCell(row, "知识点"));
    const answer = readCell(row, "正确答案").trim().toUpperCase();
    const options =
      type === "single-choice"
        ? ["选项A", "选项B", "选项C", "选项D"].map((field) => readCell(row, field))
        : undefined;
    const bankId = createBankId(stageMap[stageText], readCell(row, "学科"), bankTitle);

    questions.push({
      id: `imported-${bankId}-${String(questions.length + 1).padStart(4, "0")}`,
      bankId,
      bankTitle,
      recommendedMinutes: parseRecommendedMinutes(readCell(row, "推荐时长")),
      stage: stageMap[stageText],
      grade: readCell(row, "年级"),
      subject: readCell(row, "学科"),
      knowledgePoint: knowledgePoints.join(" / "),
      knowledgePoints,
      type,
      difficulty: difficultyMap[difficultyText],
      stem: readCell(row, "题干"),
      options,
      answer,
      explanation: readCell(row, "解析"),
    });
  });

  return { questions, errors };
}

function validateRow(row: ExcelRow, rowNumber: number) {
  const errors: string[] = [];

  requiredFields.forEach((field) => {
    if (!readCell(row, field)) {
      errors.push(`第 ${rowNumber} 行缺少字段：${field}`);
    }
  });

  const stageText = readCell(row, "学段");
  const difficultyText = readCell(row, "难度");
  const typeText = readCell(row, "题型");
  const type = typeMap[typeText];

  if (stageText && !stageMap[stageText]) {
    errors.push(`第 ${rowNumber} 行学段格式错误：${stageText}`);
  }

  if (difficultyText && !difficultyMap[difficultyText]) {
    errors.push(`第 ${rowNumber} 行难度格式错误：${difficultyText}`);
  }

  if (typeText && !type) {
    errors.push(`第 ${rowNumber} 行题型格式错误：${typeText}`);
  }

  if (type === "single-choice") {
    ["选项A", "选项B", "选项C", "选项D"].forEach((field) => {
      if (!readCell(row, field)) {
        errors.push(`第 ${rowNumber} 行选择题缺少字段：${field}`);
      }
    });

    const answer = readCell(row, "正确答案").trim().toUpperCase();
    if (answer && !["A", "B", "C", "D"].includes(answer)) {
      errors.push(`第 ${rowNumber} 行选择题正确答案必须是 A/B/C/D`);
    }
  }

  return errors;
}

function readCell(row: ExcelRow, field: string) {
  return String(row[field] ?? "").trim();
}

function splitKnowledgePoints(value: string) {
  const points = value
    .split(/[、,，/｜|]/)
    .map((item) => item.trim())
    .filter(Boolean);

  return points.length > 0 ? points : [value];
}

function parseRecommendedMinutes(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 20;
}

function createBankId(stage: PracticeStage, subject: string, bankTitle: string) {
  const source = `${stage}-${subject}-${bankTitle}`;
  return source
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u4e00-\u9fa5a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}
