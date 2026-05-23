import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Baby,
  BookA,
  BookOpen,
  Bot,
  BrainCircuit,
  Calculator,
  CalendarCheck,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Image,
  Languages,
  Leaf,
  Map,
  MessageCircle,
  Palette,
  Pencil,
  Repeat2,
  Rocket,
  Scale,
  School,
  ScrollText,
  Shapes,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { CyberCard } from "../components/common/CyberCard";
import { GlowButton } from "../components/common/GlowButton";
import { MobileShell } from "../components/layout/MobileShell";
import {
  normalizeLearningStage,
  stageModuleMap,
  stageModules,
  type LearningModule,
  type LearningStage,
  type StageModule,
} from "../data/stageModules";
import { cn } from "../utils/cn";

const pageCopy: Record<LearningStage, { title: string; subtitle: string }> = {
  preschool: {
    title: "幼小衔接启蒙乐园",
    subtitle: "AI陪孩子画画、识字、学拼音、练表达",
  },
  primary: {
    title: "小学同步学习中心",
    subtitle: "同步课堂、课后练习、错题讲给AI听",
  },
  middle: {
    title: "初中提分训练中心",
    subtitle: "聚焦薄弱点、中考题型和错因突破",
  },
};

const stageIcons: Record<LearningStage, LucideIcon> = {
  preschool: Baby,
  primary: School,
  middle: GraduationCap,
};

const moduleIcons: Record<string, LucideIcon> = {
  palette: Palette,
  "book-a": BookA,
  speech: MessageCircle,
  shapes: Shapes,
  languages: Languages,
  image: Image,
  target: Target,
  "book-open": BookOpen,
  calculator: Calculator,
  pencil: Pencil,
  brain: BrainCircuit,
  bot: Bot,
  calendar: CalendarCheck,
  atom: Atom,
  flask: FlaskConical,
  scroll: ScrollText,
  scale: Scale,
  leaf: Leaf,
  map: Map,
  trophy: Trophy,
  repeat: Repeat2,
};

export function CoursePage() {
  const [params] = useSearchParams();
  const stage = normalizeLearningStage(params.get("stage"));
  const [notice, setNotice] = useState("");
  const currentStage = stage ? stageModuleMap[stage] : null;
  const copy = stage ? pageCopy[stage] : null;

  const availableCount = useMemo(
    () => currentStage?.modules.filter((item) => item.status === "available").length ?? 0,
    [currentStage],
  );

  return (
    <MobileShell>
      <div className="space-y-5">
        {!currentStage || !copy ? (
          <StageEntryView />
        ) : (
          <>
            <header className="space-y-3">
              <p className="inline-flex items-center gap-1 rounded-full border border-white/90 bg-white/[0.78] px-3 py-1 text-xs font-bold text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
                <Sparkles size={13} />
                {currentStage.ageRange}
              </p>
              <div>
                <h1 className="text-2xl font-black text-cyber-text">{copy.title}</h1>
                <p className="mt-2 text-sm leading-6 text-cyber-muted">{copy.subtitle}</p>
              </div>
              <CyberCard className={cn("overflow-hidden bg-gradient-to-br p-4", currentStage.theme)}>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/70 blur-3xl" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-white/[0.78] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.1)]">
                    {renderStageIcon(currentStage.stage)}
                  </div>
                  <div>
                    <p className="font-black text-cyber-text">{currentStage.title}</p>
                    <p className="mt-1 text-xs leading-5 text-cyber-muted">
                      已开放 {availableCount} 个可演示入口，其余模块先保留为“功能开发中”。
                    </p>
                  </div>
                </div>
              </CyberCard>
            </header>

            {notice && (
              <CyberCard className="border-cyber-yellow/35 bg-cyber-yellow/10 p-3">
                <p className="text-sm font-bold text-cyber-yellow">{notice}</p>
              </CyberCard>
            )}

            <div className="grid grid-cols-1 gap-3">
              {currentStage.modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onComingSoon={() => setNotice(`${module.title} 功能开发中，后续会接入专属内容。`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </MobileShell>
  );
}

function StageEntryView() {
  return (
    <>
      <header className="space-y-3">
        <p className="inline-flex items-center gap-1 rounded-full border border-white/90 bg-white/[0.78] px-3 py-1 text-xs font-bold text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
          <Rocket size={13} />
          先选择学段
        </p>
        <div>
          <h1 className="text-2xl font-black text-cyber-text">课程中心</h1>
          <p className="mt-2 text-sm leading-6 text-cyber-muted">
            请选择幼小衔接、小学或初中，进入对应学习中心。
          </p>
        </div>
      </header>

      <div className="space-y-3">
        {stageModules.map((stage) => {
          const Icon = stageIcons[stage.stage];
          return (
            <Link key={stage.id} to={`/courses?stage=${stage.stage}`}>
              <CyberCard className={cn("overflow-hidden bg-gradient-to-br p-4", stage.theme)}>
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-white/[0.78] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
                    <Icon size={28} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-black text-cyber-text">{stage.title}</h2>
                    <p className="mt-1 text-xs leading-5 text-cyber-muted">{stage.ageRange}</p>
                    <p className="mt-2 text-sm leading-5 text-cyber-muted">{stage.description}</p>
                  </div>
                  <ChevronRight className="shrink-0 text-cyber-purple" size={20} />
                </div>
              </CyberCard>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function ModuleCard({
  module,
  onComingSoon,
}: {
  module: LearningModule;
  onComingSoon: () => void;
}) {
  const Icon = moduleIcons[module.icon] ?? Sparkles;
  const content = (
    <CyberCard
      className={cn(
        "overflow-hidden p-4 transition active:scale-[0.99]",
        module.status === "available" && "shadow-glow-soft",
      )}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#EDE9FE]/70 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <div
          className={cn(
            "flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-white/[0.78] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.1)]",
            module.status === "available" && "bg-blue-glow !text-white shadow-button-glow",
          )}
        >
          <Icon size={25} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-cyber-text">{module.title}</h2>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                module.status === "available"
                  ? "bg-cyber-green/14 text-cyber-green"
                  : "bg-cyber-yellow/14 text-cyber-yellow",
              )}
            >
              {module.status === "available" ? "可体验" : "开发中"}
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-cyber-muted">{module.desc}</p>
        </div>
        <ChevronRight className="shrink-0 text-cyber-purple" size={18} />
      </div>
    </CyberCard>
  );

  if (module.status === "available" && module.path) {
    return <Link to={module.path}>{content}</Link>;
  }

  return (
    <button className="w-full text-left" onClick={onComingSoon}>
      {content}
    </button>
  );
}

function renderStageIcon(stage: LearningStage) {
  const Icon = stageIcons[stage];
  return <Icon size={28} />;
}
