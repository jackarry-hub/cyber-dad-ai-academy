import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, BrainCircuit, Gauge, Lightbulb, Target } from "lucide-react";
import { CyberCard } from "../components/common/CyberCard";
import { ProgressBar } from "../components/common/ProgressBar";
import { SectionHeader } from "../components/common/SectionHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { mockReport } from "../data/mockReports";
import type { MistakeRecord } from "../types/question";
import { getMistakeRecords, getPracticeRecords } from "../utils/storage";

export function ReportPage() {
  const practiceRecords = useMemo(() => getPracticeRecords(), []);
  const mistakeRecords = useMemo(() => getMistakeRecords(), []);
  const total = practiceRecords.length || mockReport.completedQuestions;
  const correct = practiceRecords.length
    ? practiceRecords.filter((record) => record.isCorrect).length
    : Math.round((mockReport.completedQuestions * mockReport.accuracy) / 100);
  const mistakeCount = practiceRecords.length
    ? practiceRecords.filter((record) => !record.isCorrect).length
    : Math.max(0, total - correct);
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : mockReport.accuracy;
  const weakPoints = getTopValues(
    mistakeRecords.map((record) => record.question.knowledgePoint),
    mockReport.weakPoints,
  );
  const commonReasons = getTopValues(
    mistakeRecords.map((record) => record.aiAnalysis.reasonTag),
    ["概念混淆", "审题不清"],
  );
  const aiSuggestions = getAiSuggestions(mistakeRecords);

  return (
    <MobileShell>
      <div className="space-y-5">
        <SectionHeader title="学习报告" action="本周趋势" />

        <CyberCard className="overflow-hidden p-4" glow>
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
          <div className="relative">
            <p className="text-sm text-cyber-muted">今日学习概览</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="cyber-number text-4xl font-black text-cyber-text">{accuracy}%</span>
              <span className="pb-1 text-sm text-cyber-muted">当前正确率</span>
            </div>
            <ProgressBar progress={accuracy} className="mt-4" />
            <p className="mt-3 text-sm leading-6 text-cyber-muted">
              {practiceRecords.length
                ? `今天已完成 ${total} 道练习，答对 ${correct} 道，错题 ${mistakeCount} 道。`
                : "当前展示 mock 默认报告。完成练习后，这里会自动更新真实本地统计。"}
            </p>
          </div>
        </CyberCard>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard icon={Activity} label="做题数量" value={`${total}题`} />
          <MetricCard icon={Target} label="正确题数" value={`${correct}题`} />
          <MetricCard icon={BrainCircuit} label="错题数量" value={`${mistakeCount}题`} />
          <MetricCard icon={Gauge} label="正确率" value={`${accuracy}%`} />
        </div>

        <CyberCard className="p-4">
          <h2 className="font-black text-cyber-text">薄弱知识点</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {weakPoints.map((point) => (
              <Badge key={point}>{point}</Badge>
            ))}
          </div>
        </CyberCard>

        <CyberCard className="p-4">
          <h2 className="font-black text-cyber-text">常见错因</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {commonReasons.map((reason) => (
              <Badge key={reason}>{reason}</Badge>
            ))}
          </div>
        </CyberCard>

        <CyberCard className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="text-cyber-yellow" size={21} />
            <h2 className="font-black text-cyber-text">AI学习建议</h2>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <p key={suggestion} className="text-sm leading-6 text-cyber-muted">
                {index + 1}. {suggestion}
              </p>
            ))}
          </div>
        </CyberCard>

        <CyberCard className="p-4">
          <h2 className="font-black text-cyber-text">下一步学习任务</h2>
          <p className="mt-3 text-sm leading-6 text-cyber-muted">
            优先复习
            <span className="px-1 font-bold text-cyber-cyan">{weakPoints[0]}</span>
            ，再完成 3 道同类变式题，并把解题过程讲给赛博老爸AI听。
          </p>
        </CyberCard>
      </div>
    </MobileShell>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <CyberCard className="p-4">
      <Icon className="text-cyber-cyan" size={22} />
      <p className="mt-3 text-xs text-cyber-muted">{label}</p>
      <p className="cyber-number mt-1 text-xl font-black text-cyber-text">{value}</p>
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

function getTopValues(values: string[], fallback: string[]) {
  if (values.length === 0) return fallback.slice(0, 3);

  const counts = values.reduce<Record<string, number>>((map, item) => {
    map[item] = (map[item] ?? 0) + 1;
    return map;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([value]) => value)
    .slice(0, 3);
}

function getAiSuggestions(records: MistakeRecord[]) {
  if (records.length === 0) return mockReport.aiSuggestions;

  const unique = Array.from(new Set(records.map((record) => record.aiAnalysis.suggestion)));
  return [
    ...unique.slice(0, 2),
    "每次错题复盘时，先讲自己的思路，再对照正确思路补齐关键步骤。",
  ];
}
