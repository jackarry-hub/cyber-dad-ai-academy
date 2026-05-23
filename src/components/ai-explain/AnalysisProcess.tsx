import { CheckCircle2, Circle, Ear, FileSearch, Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";
import { CyberCard } from "../common/CyberCard";

const steps = [
  { title: "正在听你的解题思路", icon: Ear },
  { title: "正在对比正确解法", icon: FileSearch },
  { title: "正在生成错因报告", icon: Sparkles },
];

interface AnalysisProcessProps {
  visible: boolean;
  activeStep: number;
  done: boolean;
}

export function AnalysisProcess({ visible, activeStep, done }: AnalysisProcessProps) {
  if (!visible) return null;

  return (
    <CyberCard className="p-4">
      <p className="mb-3 text-sm font-black text-cyber-text">赛博老爸正在听你讲……</p>
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed = done || activeStep >= index;
          return (
            <div key={step.title} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                  completed
                    ? "border-[#D9D2FF] bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
                    : "border-cyber-border bg-white/70 text-cyber-weak",
                )}
              >
                {done || activeStep > index ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </div>
              <p
                className={cn(
                  "flex-1 text-sm font-bold",
                  completed ? "text-cyber-text" : "text-cyber-weak",
                )}
              >
                {step.title}
              </p>
              {completed ? (
                <CheckCircle2 size={16} className="text-cyber-green" />
              ) : (
                <Circle size={14} className="text-cyber-weak" />
              )}
            </div>
          );
        })}
      </div>
    </CyberCard>
  );
}
