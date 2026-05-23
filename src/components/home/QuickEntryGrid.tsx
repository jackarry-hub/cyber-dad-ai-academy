import { Baby, Bot, BrainCircuit, Brush, GraduationCap, School } from "lucide-react";
import { Link } from "react-router-dom";
import { CyberCard } from "../common/CyberCard";
import { cn } from "../../utils/cn";

const entries = [
  { label: "幼小衔接", path: "/courses?stage=preschool", icon: Baby, tone: "from-[#FFF4E8] to-[#FFF9F0]", iconTone: "bg-[#FFE7C7] text-[#F59E0B]" },
  { label: "小学同步", path: "/courses?stage=primary", icon: School, tone: "from-[#EEF7FF] to-[#F8FBFF]", iconTone: "bg-[#DBEAFE] text-[#3B82F6]" },
  { label: "初中提升", path: "/courses?stage=middle", icon: GraduationCap, tone: "from-[#F1EDFF] to-[#F7F3FF]", iconTone: "bg-[#EDE9FE] text-[#7B61FF]" },
  { label: "AI绘画", path: "/courses?stage=preschool", icon: Brush, tone: "from-[#FFF1F7] to-[#FFF7ED]", iconTone: "bg-[#FCE7F3] text-[#EC4899]" },
  { label: "我给AI讲习题", path: "/ai-explain?demo=1", icon: Bot, featured: true, tone: "from-[#EEF2FF] to-[#F7F3FF]", iconTone: "bg-blue-glow !text-white" },
  { label: "AI错因分析", path: "/report", icon: BrainCircuit, tone: "from-[#FFF4E8] to-[#FFF9F0]", iconTone: "bg-[#FFEDD5] text-[#F97316]" },
];

export function QuickEntryGrid() {
  return (
    <CyberCard className="grid grid-cols-3 gap-2.5 p-3.5">
      {entries.map((entry) => {
        const Icon = entry.icon;
        return (
          <Link
            key={entry.label}
            to={entry.path}
            className={cn(
              `flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-[18px] border border-white/90 bg-gradient-to-br px-2 text-center shadow-[0_10px_22px_rgba(90,105,160,0.08)] transition active:scale-[0.98] ${entry.tone}`,
              entry.featured &&
                "border-[#D9D2FF] shadow-[0_12px_26px_rgba(123,97,255,0.16)]",
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl border border-white/90 shadow-[0_8px_18px_rgba(90,105,160,0.1)]",
                entry.iconTone,
                entry.featured && "shadow-button-glow",
              )}
            >
              <Icon size={22} />
            </span>
            <span className="text-[11px] font-bold leading-4 text-cyber-text">{entry.label}</span>
          </Link>
        );
      })}
    </CyberCard>
  );
}
