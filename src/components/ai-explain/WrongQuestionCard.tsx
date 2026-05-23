import { AlertCircle } from "lucide-react";
import { difficultyLabels, getOptionText, optionKeys, stageLabelsForPractice } from "../../data/mockQuestions";
import type { CurrentWrongQuestion } from "../../types/question";
import { cn } from "../../utils/cn";
import { CyberCard } from "../common/CyberCard";

interface WrongQuestionCardProps {
  wrongQuestion: CurrentWrongQuestion;
  isDemo: boolean;
}

export function WrongQuestionCard({ wrongQuestion, isDemo }: WrongQuestionCardProps) {
  const question = wrongQuestion.question;
  const selectedAnswerText = formatAnswer(wrongQuestion, wrongQuestion.selectedAnswer);
  const correctAnswerText = formatAnswer(wrongQuestion, wrongQuestion.correctAnswer);

  return (
    <CyberCard className="overflow-hidden p-4">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#EDE9FE]/70 blur-3xl" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-cyber-blue">
              {stageLabelsForPractice[question.stage]} · {question.grade} · {question.subject}
            </p>
            <p className="mt-1 text-xs text-cyber-muted">
              {question.knowledgePoint} · 难度：{difficultyLabels[question.difficulty]}
            </p>
          </div>
          {isDemo && (
            <span className="shrink-0 rounded-full border border-cyber-yellow/40 bg-cyber-yellow/10 px-2 py-1 text-[11px] font-bold text-cyber-yellow">
              演示题
            </span>
          )}
        </div>

        {isDemo && (
          <div className="mb-3 flex gap-2 rounded-2xl border border-cyber-yellow/25 bg-cyber-yellow/10 p-3">
            <AlertCircle size={17} className="mt-0.5 shrink-0 text-cyber-yellow" />
            <p className="text-xs leading-5 text-cyber-muted">
              当前为演示题目，你也可以从做题练习中选择错题后进入。
            </p>
          </div>
        )}

        <h2 className="text-lg font-black leading-7 text-cyber-text">{question.stem}</h2>

        {question.options && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {question.options.map((option, index) => {
              const key = optionKeys[index];
              return (
                <div
                  key={option}
                  className={cn(
                    "rounded-2xl border border-white/90 bg-white/[0.72] p-3 text-sm text-cyber-text shadow-[0_6px_14px_rgba(90,105,160,0.06)]",
                    key === wrongQuestion.correctAnswer && "border-cyber-green/50 bg-cyber-green/10",
                    key === wrongQuestion.selectedAnswer &&
                      key !== wrongQuestion.correctAnswer &&
                      "border-cyber-red/50 bg-cyber-red/10",
                  )}
                >
                  {key}. {option}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <AnswerBox label="学生答案" value={selectedAnswerText} wrong />
          <AnswerBox label="正确答案" value={correctAnswerText} />
        </div>
      </div>
    </CyberCard>
  );
}

function AnswerBox({
  label,
  value,
  wrong = false,
}: {
  label: string;
  value: string;
  wrong?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        wrong ? "border-cyber-red/30 bg-cyber-red/10" : "border-cyber-green/30 bg-cyber-green/10",
      )}
    >
      <p className="text-[11px] text-cyber-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-cyber-text">{value}</p>
    </div>
  );
}

function formatAnswer(record: CurrentWrongQuestion, answer: string) {
  return record.question.options ? `${answer}. ${getOptionText(record.question, answer)}` : answer;
}
