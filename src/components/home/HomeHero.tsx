import { Bell, BookOpenCheck, Bot, BrainCircuit, Play, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero-warm-robot.png";
import { CyberCard } from "../common/CyberCard";
import { GlowButton } from "../common/GlowButton";

const sellingPoints = [
  { label: "系统课程", icon: BookOpenCheck, tone: "from-[#EEF7FF] to-[#F8FBFF] text-[#3B82F6]" },
  { label: "AI讲题", icon: Bot, tone: "from-[#EEF2FF] to-[#F7F3FF] text-[#7B61FF]" },
  { label: "错因分析", icon: BrainCircuit, tone: "from-[#FFF4E8] to-[#FFF9F0] text-[#F59E0B]" },
];

export function HomeHero() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 pt-1">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 min-[390px]:w-[172px] min-[390px]:flex-none">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/95 bg-white/90 shadow-[0_10px_24px_rgba(90,105,160,0.12)]">
            <Bot size={24} className="text-cyber-blue" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white bg-cyber-green" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-black leading-5 text-cyber-text">赛博老爸AI学院</h1>
            <p className="truncate text-[11px] text-cyber-muted">学AI · 用AI · 赢未来</p>
          </div>
        </div>
        <label className="hidden h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-cyber-border bg-white/[0.86] px-3 shadow-[0_8px_24px_rgba(90,105,160,0.08)] min-[390px]:flex">
          <Search size={17} className="shrink-0 text-cyber-cyan" />
          <input
            className="min-w-0 flex-1 bg-transparent text-xs text-cyber-text outline-none placeholder:text-cyber-muted"
            placeholder="搜索课程、题目、AI工具"
          />
        </label>
        <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/[0.88] text-cyber-text shadow-[0_8px_24px_rgba(90,105,160,0.1)]">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyber-red" />
        </button>
      </div>

      <label className="flex h-11 items-center gap-3 rounded-full border border-cyber-border bg-white/[0.86] px-4 shadow-[0_8px_24px_rgba(90,105,160,0.08)] min-[390px]:hidden">
        <Search size={20} className="text-cyber-cyan" />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-cyber-text outline-none placeholder:text-cyber-muted"
          placeholder="搜索课程、题目、AI工具"
        />
      </label>

      <CyberCard className="hero-card relative min-h-[338px] overflow-hidden rounded-[28px] p-[18px]" glow>
        <div className="absolute -right-12 top-6 h-56 w-56 rounded-full bg-[#EDE9FE]/70 blur-2xl" />
        <div className="absolute -left-12 -top-14 h-40 w-40 rounded-full bg-[#FFE4C7]/70 blur-2xl" />
        <div className="animal-deco absolute right-4 top-4 z-20 h-9 w-9 rounded-full bg-white/[0.78] text-lg shadow-[0_8px_18px_rgba(90,105,160,0.12)]">
          ⭐
        </div>
        <div className="animal-deco absolute left-5 bottom-5 z-20 h-8 w-8 rounded-full bg-[#FFF4E8] text-base shadow-[0_8px_18px_rgba(90,105,160,0.1)]">
          🐰
        </div>
        <div className="cyber-orbit absolute right-[-20px] top-12 h-60 w-60 rounded-full opacity-70" />
        <div className="absolute right-8 top-20 h-36 w-36 rounded-full bg-white/48" />
        <img
          src={heroImage}
          alt="赛博老爸温暖学习助手"
          className="absolute bottom-5 right-[-22px] h-[72%] w-[54%] rounded-[26px] object-contain opacity-95 saturate-[0.94] brightness-[1.02]"
        />
        <div className="absolute inset-y-0 right-0 z-[1] w-[72%] bg-gradient-to-l from-white/[0.02] via-white/[0.22] to-white" />
        <div className="absolute right-4 top-16 z-20 rounded-2xl border border-white/90 bg-white/[0.82] px-3 py-2 text-[11px] leading-4 text-cyber-muted shadow-[0_10px_24px_rgba(90,105,160,0.1)] backdrop-blur">
          赛博老爸
          <span className="block font-bold text-cyber-text">陪你成长</span>
        </div>
        <div className="absolute bottom-4 right-4 z-20 rounded-2xl border border-white/90 bg-white/[0.76] px-3 py-2 text-[11px] text-cyber-muted shadow-[0_10px_24px_rgba(90,105,160,0.1)] backdrop-blur">
          今日目标 · 2/3 课时
        </div>
        <div className="relative z-10 max-w-[66%] py-2">
          <div className="mb-4 inline-flex items-center gap-1 rounded-full border border-white/90 bg-white/[0.78] px-3 py-1 text-[11px] font-bold text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
            <Sparkles size={13} />
            AI学习陪跑计划
          </div>
          <p className="text-2xl font-black leading-tight text-cyber-text">从入门到高手</p>
          <p className="warm-gradient-text mt-1 text-[28px] font-black leading-tight">
            掌握AI学习力
          </p>
          <p className="mt-3 text-xs leading-5 text-cyber-muted">
            赛博老爸陪你学全科、讲错题、提成绩
          </p>
          <div className="mt-4 grid max-w-[210px] grid-cols-3 gap-2">
            {sellingPoints.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className={`flex flex-col items-center gap-1 rounded-2xl border border-white/90 bg-gradient-to-br px-2 py-2 text-[10px] font-bold shadow-[0_8px_18px_rgba(90,105,160,0.08)] ${item.tone}`}
                >
                  <Icon size={16} />
                  {item.label}
                </span>
              );
            })}
          </div>
          <Link to="/practice">
            <GlowButton className="mt-5 h-11 px-5">
              继续学习
              <Play size={16} fill="currentColor" />
            </GlowButton>
          </Link>
        </div>
      </CyberCard>
    </section>
  );
}
