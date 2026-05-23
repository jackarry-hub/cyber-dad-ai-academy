import {
  Baby,
  ChevronLeft,
  GraduationCap,
  School,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CyberCard } from "../components/common/CyberCard";
import { GlowButton } from "../components/common/GlowButton";
import { MobileShell } from "../components/layout/MobileShell";
import { stageModules, type LearningStage, type StageModule } from "../data/stageModules";
import { cn } from "../utils/cn";

const stageIcons: Record<LearningStage, typeof Baby> = {
  preschool: Baby,
  primary: School,
  middle: GraduationCap,
};

const buttonText: Record<LearningStage, string> = {
  preschool: "进入启蒙乐园",
  primary: "进入小学学习",
  middle: "进入初中学习",
};

const stageTone: Record<LearningStage, string> = {
  preschool: "border-white/90 bg-[#FFF4E8] text-[#F59E0B]",
  primary: "border-white/90 bg-[#EEF7FF] text-[#3B82F6]",
  middle: "border-white/90 bg-[#F1EDFF] text-[#7B61FF]",
};

const stageDecor: Record<LearningStage, string> = {
  preschool: "🐰",
  primary: "🐻",
  middle: "⭐",
};

export function StagePage() {
  return (
    <MobileShell>
      <div className="space-y-5">
        <header className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-full border border-cyber-border bg-white/[0.78] px-3 py-1.5 text-xs font-bold text-cyber-blue shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
          >
            <ChevronLeft size={15} />
            返回首页
          </Link>
          <div>
            <p className="inline-flex items-center gap-1 rounded-full border border-white/90 bg-white/[0.78] px-3 py-1 text-xs font-bold text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
              <Sparkles size={13} />
              学生端分龄路径
            </p>
            <h1 className="mt-3 text-2xl font-black text-cyber-text">分龄学习中心</h1>
            <p className="mt-2 text-sm leading-6 text-cyber-muted">
              根据孩子年龄阶段，进入专属学习空间。
            </p>
          </div>
        </header>

        <div className="space-y-4">
          {stageModules.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>

        <CyberCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-[#FFF4E8] text-cyber-yellow shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
              <UsersRound size={23} />
            </div>
            <div>
              <p className="font-bold text-cyber-text">家长端 / 教师端入口预留</p>
              <p className="mt-1 text-xs leading-5 text-cyber-muted">
                当前先完善学生端，后续扩展学习报告、班级分析和作业任务。
              </p>
            </div>
          </div>
        </CyberCard>
      </div>
    </MobileShell>
  );
}

function StageCard({ stage }: { stage: StageModule }) {
  const Icon = stageIcons[stage.stage];

  return (
    <CyberCard className={cn("overflow-hidden bg-gradient-to-br p-4", stage.theme)} glow>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.65] blur-3xl" />
      <div className="animal-deco absolute right-4 top-4 h-10 w-10 rounded-full bg-white/75 text-xl shadow-[0_8px_18px_rgba(90,105,160,0.1)]">
        {stageDecor[stage.stage]}
      </div>
      <div className="relative">
        <div className="flex gap-4">
          <div
            className={cn(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border shadow-card-inner",
              stageTone[stage.stage],
            )}
          >
            <Icon size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black text-cyber-text">{stage.title}</h2>
              <span className="rounded-full border border-white/90 bg-white/70 px-2 py-1 text-[11px] text-cyber-muted">
                {stage.ageRange}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-cyber-muted">{stage.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {stage.modules.map((item) => (
            <span
              key={item.id}
              className="rounded-full border border-white/90 bg-white/[0.72] px-3 py-1.5 text-xs font-semibold text-cyber-muted shadow-[0_6px_14px_rgba(90,105,160,0.06)]"
            >
              {item.title}
            </span>
          ))}
        </div>

        <Link to={`/courses?stage=${stage.stage}`}>
          <GlowButton className="mt-5 w-full">{buttonText[stage.stage]}</GlowButton>
        </Link>
      </div>
    </CyberCard>
  );
}
