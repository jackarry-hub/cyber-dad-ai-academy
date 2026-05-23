import { useMemo, useState } from "react";
import { BrainCircuit, Filter, Inbox, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CyberCard } from "../components/common/CyberCard";
import { GlowButton } from "../components/common/GlowButton";
import { SectionHeader } from "../components/common/SectionHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { getOptionText, mockQuestions, stageLabelsForPractice } from "../data/mockQuestions";
import type { CurrentWrongQuestion, MistakeRecord } from "../types/question";
import { cn } from "../utils/cn";
import { getMistakeRecords, saveCurrentWrongQuestion } from "../utils/storage";

export function MistakeBookPage() {
  const [subjectFilter, setSubjectFilter] = useState("全部");
  const [reasonFilter, setReasonFilter] = useState("全部");
  const records = useMemo(() => getMistakeRecords(), []);

  const reasonTags = useMemo(() => {
    const tags = Array.from(new Set(records.map((record) => record.aiAnalysis.reasonTag)));
    return ["全部", ...tags];
  }, [records]);
  const subjectItems = useMemo(() => {
    const fromRecords = records.map((record) => record.question.subject);
    const fromBanks = mockQuestions.map((question) => question.subject);
    return ["全部", ...Array.from(new Set([...fromRecords, ...fromBanks]))];
  }, [records]);

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const subjectMatched =
          subjectFilter === "全部" || record.question.subject === subjectFilter;
        const reasonMatched =
          reasonFilter === "全部" || record.aiAnalysis.reasonTag === reasonFilter;
        return subjectMatched && reasonMatched;
      }),
    [reasonFilter, records, subjectFilter],
  );

  const mostCommonReason = getMostCommon(records.map((record) => record.aiAnalysis.reasonTag));
  const weeklyAdded = records.filter((record) => {
    const created = new Date(record.createdAt).getTime();
    return Date.now() - created <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <MobileShell>
      <div className="space-y-5">
        <SectionHeader title="错题本" action="智能组卷" />

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="当前错题数" value={records.length.toString()} />
          <StatCard label="本周新增" value={weeklyAdded.toString()} />
          <StatCard label="常见错因" value={mostCommonReason || "暂无"} compact />
        </div>

        <CyberCard className="space-y-3 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-cyber-text">
            <Filter size={17} className="text-cyber-cyan" />
            简单筛选
          </div>
          <FilterRow
            label="学科"
            items={subjectItems}
            value={subjectFilter}
            onChange={setSubjectFilter}
          />
          <FilterRow
            label="错因"
            items={reasonTags}
            value={reasonFilter}
            onChange={setReasonFilter}
          />
        </CyberCard>

        {records.length === 0 ? (
          <CyberCard className="flex flex-col items-center p-8 text-center">
            <Inbox className="text-cyber-cyan" size={42} />
            <p className="mt-4 text-base font-black text-cyber-text">还没有错题</p>
            <p className="mt-2 text-sm leading-6 text-cyber-muted">
              先去做几道练习吧，答错后给 AI 讲题就会自动沉淀到这里。
            </p>
            <Link to="/practice" className="mt-5">
              <GlowButton>去做练习</GlowButton>
            </Link>
          </CyberCard>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <MistakeCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}

function StatCard({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <CyberCard className="p-3 text-center">
      <p className="text-[11px] text-cyber-muted">{label}</p>
      <p
        className={cn(
          "cyber-number mt-2 font-black text-cyber-text",
          compact ? "text-sm leading-5" : "text-2xl",
        )}
      >
        {value}
      </p>
    </CyberCard>
  );
}

function FilterRow({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs text-cyber-muted">{label}</p>
      <div className="hide-scrollbar flex gap-2 overflow-x-auto">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs transition",
              item === value
                ? "border-[#D9D2FF] bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                : "border-cyber-border bg-white/[0.72] text-cyber-muted",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function MistakeCard({ record }: { record: MistakeRecord }) {
  const navigate = useNavigate();
  const question = record.question;

  function explainAgain() {
    const wrongQuestion: CurrentWrongQuestion = {
      id: `review-${record.question.id}-${Date.now()}`,
      question: record.question,
      selectedAnswer: record.selectedAnswer,
      correctAnswer: record.correctAnswer,
      createdAt: new Date().toISOString(),
    };

    saveCurrentWrongQuestion(wrongQuestion);
    navigate("/ai-explain", { state: wrongQuestion });
  }

  return (
    <CyberCard className="overflow-hidden p-4">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#EDE9FE]/70 blur-3xl" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-cyber-blue">
            <BrainCircuit size={18} />
            <span className="truncate text-sm font-bold">
              {stageLabelsForPractice[question.stage] ?? "练习"} · {question.grade}
            </span>
          </div>
          <span className="rounded-full bg-[#EEF2FF] px-2 py-1 text-[11px] font-bold text-cyber-purple">
            {record.aiAnalysis.reasonTag}
          </span>
        </div>

        <p className="text-base font-black leading-7 text-cyber-text">
          {question.stem.length > 56 ? `${question.stem.slice(0, 56)}...` : question.stem}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{question.subject}</Badge>
          <Badge>{question.knowledgePoint}</Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <AnswerBox
            label="学生答案"
            value={formatAnswer(record, record.selectedAnswer)}
            wrong
          />
          <AnswerBox label="正确答案" value={formatAnswer(record, record.correctAnswer)} />
        </div>

        <div className="mt-4 rounded-2xl border border-white/90 bg-white/[0.72] p-3 shadow-[0_6px_14px_rgba(90,105,160,0.06)]">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyber-cyan">
            <Sparkles size={14} />
            AI建议摘要
          </div>
          <p className="text-sm leading-6 text-cyber-muted">{record.aiAnalysis.suggestion}</p>
        </div>

        <GlowButton className="mt-4 w-full" onClick={explainAgain}>
          我再给AI讲一遍
        </GlowButton>
      </div>
    </CyberCard>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-cyber-border bg-white/[0.72] px-3 py-1 text-xs font-semibold text-cyber-blue">
      {children}
    </span>
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

function formatAnswer(record: MistakeRecord, answer: string) {
  return record.question.options ? `${answer}. ${getOptionText(record.question, answer)}` : answer;
}

function getMostCommon(items: string[]) {
  const counts = items.reduce<Record<string, number>>((map, item) => {
    map[item] = (map[item] ?? 0) + 1;
    return map;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}
