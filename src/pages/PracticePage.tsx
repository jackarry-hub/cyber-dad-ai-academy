import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CyberCard } from "../components/common/CyberCard";
import { GlowButton } from "../components/common/GlowButton";
import { SectionHeader } from "../components/common/SectionHeader";
import { MobileShell } from "../components/layout/MobileShell";
import {
  difficultyLabels,
  getOptionText,
  mockQuestions,
  optionKeys,
  questionBanks,
  stageOrder,
  stageLabelsForPractice,
} from "../data/mockQuestions";
import type { CurrentWrongQuestion, PracticeStage, Question, QuestionBank } from "../types/question";
import { cn } from "../utils/cn";
import { getImportedQuestions, saveCurrentWrongQuestion, savePracticeRecord } from "../utils/storage";

function normalizePracticeStage(value: string | null): PracticeStage {
  if (value === "bridge") return "preschool";
  if (value === "primary") return "primaryLower";
  if (stageOrder.includes(value as PracticeStage)) return value as PracticeStage;
  return "primaryLower";
}

function FilterGroup({
  label,
  children,
  layout = "scroll",
}: {
  label: string;
  children: ReactNode;
  layout?: "grid" | "scroll";
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold text-cyber-muted">{label}</p>
      <div
        className={cn(
          layout === "grid"
            ? "grid grid-cols-3 gap-2"
            : "hide-scrollbar flex gap-2 overflow-x-auto",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function buildQuestionBanksFromQuestions(questions: Question[]): QuestionBank[] {
  const bankMap = new Map<string, QuestionBank>();

  questions.forEach((question) => {
    if (bankMap.has(question.bankId)) return;

    bankMap.set(question.bankId, {
      id: question.bankId,
      title: question.bankTitle,
      stage: question.stage,
      grade: question.grade,
      subject: question.subject,
      difficulty: question.difficulty,
      recommendedMinutes: question.recommendedMinutes,
      questions: [],
    });
  });

  return Array.from(bankMap.values());
}

function getBankShortTitle(title: string) {
  if (title.includes("A卷")) return "A卷";
  if (title.includes("B卷")) return "B卷";
  return title;
}

export function PracticePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const stageParam = searchParams.get("stage");
  const subjectParam = searchParams.get("subject");
  const bankParam = searchParams.get("bank");
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentWrong, setCurrentWrong] = useState<CurrentWrongQuestion | null>(null);
  const importedQuestions = useMemo(() => getImportedQuestions(), []);
  const usingImportedQuestions = importedQuestions.length > 0;
  const availableQuestions = usingImportedQuestions ? importedQuestions : mockQuestions;
  const availableQuestionBanks = useMemo(
    () =>
      usingImportedQuestions
        ? buildQuestionBanksFromQuestions(importedQuestions)
        : questionBanks,
    [importedQuestions, usingImportedQuestions],
  );

  const stage = normalizePracticeStage(stageParam);
  const stageBanks = useMemo(
    () => availableQuestionBanks.filter((bank) => bank.stage === stage),
    [availableQuestionBanks, stage],
  );
  const subjects = useMemo(
    () => Array.from(new Set(stageBanks.map((bank) => bank.subject))),
    [stageBanks],
  );
  const subject =
    subjectParam && subjects.includes(subjectParam) ? subjectParam : subjects[0] ?? "";
  const subjectBanks = useMemo(
    () => stageBanks.filter((bank) => bank.subject === subject),
    [stageBanks, subject],
  );
  const selectedBank = subjectBanks.find((bank) => bank.id === bankParam) ?? subjectBanks[0];

  const questions = useMemo(
    () =>
      availableQuestions.filter(
        (question) =>
          question.stage === stage &&
          question.subject === subject &&
          question.bankId === selectedBank?.id,
      ),
    [availableQuestions, selectedBank?.id, stage, subject],
  );
  const question = questions[index % Math.max(questions.length, 1)];
  const isCorrect =
    Boolean(question) &&
    submitted &&
    selectedAnswer.trim().toUpperCase() === question.answer.trim().toUpperCase();

  useEffect(() => {
    setIndex(0);
    setSelectedAnswer("");
    setSubmitted(false);
    setCurrentWrong(null);
  }, [selectedBank?.id, stage, subject]);

  function switchStage(nextStage: PracticeStage) {
    const nextBank = availableQuestionBanks.find((bank) => bank.stage === nextStage);
    setSearchParams({
      stage: nextStage,
      subject: nextBank?.subject ?? "",
      bank: nextBank?.id ?? "",
    });
  }

  function switchSubject(nextSubject: string) {
    const nextBank = stageBanks.find((bank) => bank.subject === nextSubject);
    setSearchParams({
      stage,
      subject: nextSubject,
      bank: nextBank?.id ?? "",
    });
  }

  function switchBank(nextBankId: string) {
    setSearchParams({
      stage,
      subject,
      bank: nextBankId,
    });
  }

  function submitAnswer() {
    const answer = selectedAnswer.trim().toUpperCase();
    const correct = answer === question.answer.trim().toUpperCase();
    const createdAt = new Date().toISOString();

    savePracticeRecord({
      id: `practice-${question.id}-${Date.now()}`,
      questionId: question.id,
      selectedAnswer: answer,
      isCorrect: correct,
      createdAt,
    });

    setSubmitted(true);

    if (!correct) {
      const wrongRecord: CurrentWrongQuestion = {
        id: `wrong-${question.id}-${Date.now()}`,
        question,
        selectedAnswer: answer,
        correctAnswer: question.answer,
        createdAt,
      };
      setCurrentWrong(wrongRecord);
      saveCurrentWrongQuestion(wrongRecord);
    }
  }

  function nextQuestion() {
    setIndex((current) => (current + 1) % questions.length);
    setSelectedAnswer("");
    setSubmitted(false);
    setCurrentWrong(null);
  }

  function goExplain() {
    if (!currentWrong) return;
    saveCurrentWrongQuestion(currentWrong);
    navigate("/ai-explain", { state: currentWrong });
  }

  if (!question || !selectedBank) {
    return (
      <MobileShell>
        <CyberCard className="p-6 text-center">
          <p className="font-black text-cyber-text">当前题库还在整理中</p>
          <p className="mt-2 text-sm text-cyber-muted">请选择其他阶段或学科继续练习。</p>
        </CyberCard>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="space-y-5">
        <SectionHeader title={`${stageLabelsForPractice[stage]}练习`} />

        <CyberCard className="space-y-3 p-4">
          <FilterGroup label="阶段" layout="grid">
            {stageOrder.map((item) => (
              <button
                key={item}
                onClick={() => switchStage(item)}
                className={cn(
                  "h-10 min-w-0 rounded-xl border px-2 text-xs font-bold leading-none transition",
                  stage === item
                    ? "border-[#D9D2FF] bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                    : "border-cyber-border bg-white/[0.72] text-cyber-muted",
                )}
              >
                {stageLabelsForPractice[item]}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup label="学科">
            {subjects.map((item) => (
              <button
                key={item}
                onClick={() => switchSubject(item)}
                className={cn(
                  "h-9 shrink-0 rounded-xl border px-4 text-sm font-bold transition",
                  subject === item
                    ? "border-[#D9D2FF] bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                    : "border-cyber-border bg-white/[0.72] text-cyber-muted",
                )}
              >
                {item}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup label="套题">
            {subjectBanks.map((item) => (
              <button
                key={item.id}
                onClick={() => switchBank(item.id)}
                className={cn(
                  "h-9 min-w-16 shrink-0 rounded-xl border px-4 text-sm font-bold transition",
                  selectedBank.id === item.id
                    ? "border-[#D9D2FF] bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                    : "border-cyber-border bg-white/[0.72] text-cyber-muted",
                )}
              >
                {getBankShortTitle(item.title)}
              </button>
            ))}
          </FilterGroup>
        </CyberCard>

        <CyberCard className="overflow-hidden p-4" glow>
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
          <div className="relative">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cyber-blue">
                  {question.grade} · {question.subject}
                </p>
                {usingImportedQuestions && (
                  <p className="mt-1 text-xs font-bold text-cyber-purple">
                    当前使用导入题库
                  </p>
                )}
                <p className="mt-1 text-xs text-cyber-muted">
                  知识点：{question.knowledgePoint} · 难度：
                  {difficultyLabels[question.difficulty]}
                </p>
                <p className="mt-1 text-xs text-cyber-muted">
                  {question.bankTitle} · 建议 {question.recommendedMinutes} 分钟
                </p>
              </div>
              <span className="rounded-full border border-cyber-border bg-white/[0.72] px-3 py-1 text-xs text-cyber-muted">
                {index + 1}/{questions.length}
              </span>
            </div>

            <h1 className="text-xl font-black leading-8 text-cyber-text">{question.stem}</h1>

            {question.type === "single-choice" && question.options && (
              <div className="mt-5 space-y-3">
                {question.options.map((option, optionIndex) => {
                  const answerKey = optionKeys[optionIndex];
                  const active = selectedAnswer === answerKey;
                  const right = submitted && answerKey === question.answer;
                  const wrong = submitted && active && answerKey !== question.answer;

                  return (
                    <button
                      key={answerKey}
                      disabled={submitted}
                      onClick={() => setSelectedAnswer(answerKey)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.99]",
                        active
                          ? "border-[#D9D2FF] bg-[#EEF2FF] shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                          : "border-cyber-border bg-white/[0.72]",
                        right && "border-cyber-green bg-cyber-green/12",
                        wrong && "border-cyber-red bg-cyber-red/12",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.85] text-sm font-black text-cyber-muted",
                          active && "bg-blue-glow !text-white",
                          right && "bg-cyber-green text-slate-950",
                          wrong && "bg-cyber-red !text-white",
                        )}
                      >
                        {answerKey}
                      </span>
                      <span className="text-sm text-cyber-text">{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === "fill-blank" && (
              <input
                value={selectedAnswer}
                disabled={submitted}
                onChange={(event) => setSelectedAnswer(event.target.value)}
                className="mt-5 h-12 w-full rounded-2xl border border-cyber-border bg-white/[0.82] px-4 text-sm text-cyber-text outline-none placeholder:text-cyber-weak"
                placeholder="请输入你的答案"
              />
            )}

            {submitted && (
              <CyberCard className="mt-4 border-white/90 bg-white/[0.72] p-4">
                <div className="mb-2 flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="text-cyber-green" size={21} />
                  ) : (
                    <XCircle className="text-cyber-red" size={21} />
                  )}
                  <p className="font-black text-cyber-text">
                    {isCorrect ? "回答正确" : "回答错误"}
                  </p>
                </div>
                {!isCorrect && (
                  <p className="mb-2 text-sm text-cyber-muted">
                    正确答案：{question.answer}
                    {question.options
                      ? ` · ${getOptionText(question, question.answer)}`
                      : ""}
                  </p>
                )}
                <p className="text-sm leading-6 text-cyber-muted">{question.explanation}</p>
              </CyberCard>
            )}

            <div className="mt-5 flex gap-3">
              {!submitted && (
                <GlowButton
                  className="flex-1"
                  disabled={!selectedAnswer.trim()}
                  onClick={submitAnswer}
                >
                  提交答案
                </GlowButton>
              )}

              {submitted && isCorrect && (
                <GlowButton className="flex-1" onClick={nextQuestion}>
                  下一题
                  <ChevronRight size={17} />
                </GlowButton>
              )}

              {submitted && !isCorrect && (
                <>
                  <GlowButton className="flex-1" onClick={goExplain}>
                    去给AI讲习题
                  </GlowButton>
                  <GlowButton tone="ghost" onClick={nextQuestion} className="px-4">
                    下一题
                  </GlowButton>
                </>
              )}
            </div>
          </div>
        </CyberCard>
      </div>
    </MobileShell>
  );
}
