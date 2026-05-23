import { Bot, BrainCircuit, MessageCircle, Repeat2, Sparkles } from "lucide-react";
import { CyberCard } from "../common/CyberCard";

const tags = [
  { label: "听你讲思路", icon: MessageCircle },
  { label: "找到真错因", icon: BrainCircuit },
  { label: "生成变式题", icon: Repeat2 },
  { label: "更新错题本", icon: Sparkles },
];

export function AiExplainHero() {
  return (
    <CyberCard className="hero-card overflow-hidden rounded-[28px] p-5" glow>
      <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#EDE9FE]/70 blur-2xl" />
      <div className="absolute right-5 top-7 h-24 w-24 rounded-full bg-white/[0.55]" />
      <div className="relative flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/90 bg-blue-glow !text-white shadow-button-glow">
          <Bot size={34} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-cyber-cyan">核心功能 · 学生讲给AI听</p>
          <h1 className="mt-2 text-2xl font-black leading-tight text-cyber-text">我给AI讲习题</h1>
          <p className="mt-2 text-sm font-bold leading-6 text-cyber-blue">
            把你的解题思路讲给赛博老爸AI听
          </p>
          <p className="mt-1 text-xs leading-5 text-cyber-muted">
            AI不只看答案，更会分析你是在哪一步想错了。
          </p>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2">
        {tags.map((tag) => {
          const Icon = tag.icon;
          return (
            <div
              key={tag.label}
              className="flex items-center gap-2 rounded-2xl border border-white/90 bg-white/[0.72] px-3 py-2 shadow-[0_8px_18px_rgba(90,105,160,0.08)]"
            >
              <Icon size={16} className="text-cyber-cyan" />
              <span className="text-xs font-bold text-cyber-text">{tag.label}</span>
            </div>
          );
        })}
      </div>

      <div className="relative mt-4 rounded-2xl border border-white/90 bg-white/[0.74] p-3 shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
        <p className="text-sm font-black leading-6 text-cyber-text">
          不是看答案，而是看思路。
          <span className="block text-cyber-purple">越讲越会，越错越准。</span>
        </p>
      </div>
    </CyberCard>
  );
}
