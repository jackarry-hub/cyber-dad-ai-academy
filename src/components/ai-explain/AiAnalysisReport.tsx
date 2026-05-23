import { BrainCircuit, Lightbulb, Sparkles } from "lucide-react";
import type { AiAnalysis } from "../../types/question";
import { getAiJudgement, getDadReminder } from "../../utils/aiAnalysis";
import { CyberCard } from "../common/CyberCard";

interface AiAnalysisReportProps {
  analysis: AiAnalysis | null;
}

export function AiAnalysisReport({ analysis }: AiAnalysisReportProps) {
  if (!analysis) return null;

  return (
    <CyberCard className="overflow-hidden p-4" glow>
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <BrainCircuit className="text-cyber-cyan" size={22} />
          <h2 className="font-black text-cyber-text">赛博老爸AI错因报告</h2>
        </div>

        <div className="space-y-3">
          <ReportBlock title="AI判断" body={getAiJudgement(analysis)} />

          <div className="rounded-2xl border border-cyber-cyan/35 bg-cyber-cyan/10 p-3">
            <p className="text-xs text-cyber-muted">错因标签</p>
            <span className="mt-2 inline-flex rounded-full bg-blue-glow px-3 py-1 text-xs font-black !text-white shadow-button-glow">
              {analysis.reasonTag}
            </span>
          </div>

          <ReportBlock title="错误步骤" body={analysis.wrongStep} />

          <div className="rounded-2xl border border-cyber-green/35 bg-cyber-green/10 p-3">
            <p className="text-xs text-cyber-muted">正确思路</p>
            <p className="mt-1 text-sm font-bold leading-6 text-cyber-text">
              {analysis.correctThinking}
            </p>
          </div>

          <div className="rounded-2xl border border-cyber-yellow/35 bg-cyber-yellow/10 p-3">
            <div className="mb-1 flex items-center gap-2 text-cyber-yellow">
              <Lightbulb size={16} />
              <p className="text-xs font-bold">赛博老爸提醒</p>
            </div>
            <p className="text-sm leading-6 text-slate-100">{getDadReminder(analysis)}</p>
          </div>

          <div className="rounded-2xl border border-white/90 bg-white/[0.72] p-3 shadow-[0_6px_14px_rgba(90,105,160,0.06)]">
            <div className="mb-1 flex items-center gap-2 text-cyber-cyan">
              <Sparkles size={16} />
              <p className="text-xs font-bold">变式训练建议</p>
            </div>
            <p className="text-sm leading-6 text-cyber-muted">{analysis.variantTraining}</p>
          </div>
        </div>
      </div>
    </CyberCard>
  );
}

function ReportBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/90 bg-white/[0.72] p-3 shadow-[0_6px_14px_rgba(90,105,160,0.06)]">
      <p className="text-xs text-cyber-muted">{title}</p>
      <p className="mt-1 text-sm leading-6 text-cyber-muted">{body}</p>
    </div>
  );
}
