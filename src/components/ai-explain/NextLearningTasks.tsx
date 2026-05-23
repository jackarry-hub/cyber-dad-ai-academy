import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CyberCard } from "../common/CyberCard";
import { GlowButton } from "../common/GlowButton";

const tasks = [
  "复习当前知识点 5 分钟",
  "再练 3 道同类变式题",
  "明天自动加入复习计划",
  "错题已同步到错题本",
];

interface NextLearningTasksProps {
  visible: boolean;
  practicePath: string;
}

export function NextLearningTasks({ visible, practicePath }: NextLearningTasksProps) {
  if (!visible) return null;

  return (
    <CyberCard className="p-4">
      <h2 className="text-lg font-black text-cyber-text">下一步学习任务</h2>
      <div className="mt-3 space-y-3">
        {tasks.map((task) => (
          <div key={task} className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/[0.72] p-3 shadow-[0_6px_14px_rgba(90,105,160,0.06)]">
            <CheckCircle2 size={18} className="text-cyber-green" />
            <p className="text-sm font-bold text-cyber-text">{task}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
        <Link to={practicePath}>
          <GlowButton className="w-full">开始变式训练</GlowButton>
        </Link>
        <Link to="/mistakes">
          <GlowButton tone="ghost" className="w-full">
            查看错题本
          </GlowButton>
        </Link>
        <Link to={practicePath}>
          <GlowButton tone="ghost" className="w-full">
            继续做题
          </GlowButton>
        </Link>
      </div>
    </CyberCard>
  );
}
