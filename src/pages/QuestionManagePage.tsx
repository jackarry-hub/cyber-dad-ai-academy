import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  BrainCircuit,
  Database,
  FileSpreadsheet,
  type LucideIcon,
  Search,
  Trash2,
} from "lucide-react";
import { CyberCard } from "../components/common/CyberCard";
import { GlowButton } from "../components/common/GlowButton";
import { SectionHeader } from "../components/common/SectionHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { difficultyLabels, mockQuestions, stageLabelsForPractice } from "../data/mockQuestions";
import type { Question } from "../types/question";
import { cn } from "../utils/cn";
import {
  clearImportedQuestions,
  clearLearningData,
  getImportedQuestions,
  getMistakeRecords,
  getPracticeRecords,
} from "../utils/storage";

export function QuestionManagePage() {
  const [subjectFilter, setSubjectFilter] = useState("全部");
  const [knowledgeQuery, setKnowledgeQuery] = useState("");
  const [version, setVersion] = useState(0);

  const importedQuestions = useMemo(() => getImportedQuestions(), [version]);
  const practiceRecords = useMemo(() => getPracticeRecords(), [version]);
  const mistakeRecords = useMemo(() => getMistakeRecords(), [version]);
  const allQuestions = useMemo(
    () => [...importedQuestions, ...mockQuestions],
    [importedQuestions],
  );
  const subjects = useMemo(
    () => ["全部", ...Array.from(new Set(allQuestions.map((question) => question.subject)))],
    [allQuestions],
  );
  const filteredQuestions = useMemo(
    () =>
      allQuestions.filter((question) => {
        const subjectMatched = subjectFilter === "全部" || question.subject === subjectFilter;
        const query = knowledgeQuery.trim();
        const knowledgeMatched =
          !query ||
          question.knowledgePoint.includes(query) ||
          question.knowledgePoints.some((point) => point.includes(query));
        return subjectMatched && knowledgeMatched;
      }),
    [allQuestions, knowledgeQuery, subjectFilter],
  );

  function refresh() {
    setVersion((current) => current + 1);
  }

  function handleClearImportedQuestions() {
    clearImportedQuestions();
    refresh();
  }

  function handleClearLearningData() {
    clearLearningData();
    refresh();
  }

  return (
    <MobileShell>
      <div className="space-y-5">
        <SectionHeader title="题库管理" action="本地数据" />

        <CyberCard className="overflow-hidden p-4" glow>
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
              <Database size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-cyber-text">本地题库管理</h1>
              <p className="mt-1 text-xs leading-5 text-cyber-muted">
                统一查看内置题库、导入题库、练习记录和错题沉淀。
              </p>
            </div>
          </div>
        </CyberCard>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={BookOpenCheck} label="内置题库数量" value={mockQuestions.length} />
          <StatCard icon={FileSpreadsheet} label="导入题库数量" value={importedQuestions.length} />
          <StatCard icon={Database} label="总题目数量" value={allQuestions.length} />
          <StatCard icon={BookOpenCheck} label="练习记录数" value={practiceRecords.length} />
          <StatCard icon={BrainCircuit} label="错题数量" value={mistakeRecords.length} />
        </div>

        <CyberCard className="space-y-4 p-4">
          <div>
            <p className="mb-2 text-xs font-bold text-cyber-muted">按学科筛选</p>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSubjectFilter(subject)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition",
                    subjectFilter === subject
                      ? "border-[#D9D2FF] bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                      : "border-cyber-border bg-white/[0.72] text-cyber-muted",
                  )}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <label className="flex h-11 items-center gap-2 rounded-2xl border border-cyber-border bg-white/[0.82] px-3 shadow-[inset_0_1px_4px_rgba(90,105,160,0.08)]">
            <Search size={18} className="text-cyber-blue" />
            <input
              value={knowledgeQuery}
              onChange={(event) => setKnowledgeQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-cyber-text outline-none placeholder:text-cyber-weak"
              placeholder="搜索知识点，例如：方程、阅读理解"
            />
          </label>
        </CyberCard>

        <CyberCard className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-black text-cyber-text">题目列表</h2>
              <p className="mt-1 text-xs text-cyber-muted">
                当前筛选出 {filteredQuestions.length} 道题
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {filteredQuestions.slice(0, 12).map((question) => (
              <QuestionRow
                key={`${question.id}-${question.bankId}`}
                question={question}
                imported={importedQuestions.some((item) => item.id === question.id)}
              />
            ))}
          </div>

          {filteredQuestions.length > 12 && (
            <p className="mt-3 text-xs text-cyber-muted">仅展示前 12 道，继续筛选可缩小范围。</p>
          )}
        </CyberCard>

        <div className="grid grid-cols-1 gap-3">
          <GlowButton tone="ghost" onClick={handleClearImportedQuestions}>
            <Trash2 size={17} />
            清空导入题库
          </GlowButton>
          <GlowButton tone="ghost" onClick={handleClearLearningData}>
            <Trash2 size={17} />
            清空学习记录
          </GlowButton>
        </div>
      </div>
    </MobileShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <CyberCard className="p-4">
      <Icon className="text-cyber-blue" size={22} />
      <p className="mt-3 text-xs text-cyber-muted">{label}</p>
      <p className="cyber-number mt-1 text-2xl font-black text-cyber-text">{value}</p>
    </CyberCard>
  );
}

function QuestionRow({ question, imported }: { question: Question; imported: boolean }) {
  return (
    <div className="rounded-2xl border border-white/90 bg-white/[0.72] p-3 shadow-[0_6px_14px_rgba(90,105,160,0.06)]">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-xs font-bold text-cyber-blue">
          {stageLabelsForPractice[question.stage]} · {question.subject}
        </p>
        <span className="shrink-0 rounded-full bg-[#EEF2FF] px-2 py-1 text-[10px] font-bold text-cyber-purple">
          {imported ? "导入" : "内置"}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-black leading-6 text-cyber-text">
        {question.stem}
      </p>
      <p className="mt-1 text-xs leading-5 text-cyber-muted">
        {question.bankTitle} · {question.knowledgePoint} · {difficultyLabels[question.difficulty]}
      </p>
    </div>
  );
}
