import { Crown, MessageCircle, ThumbsUp } from "lucide-react";
import { CyberCard } from "../common/CyberCard";

const ranks = [
  { name: "AI探索者", score: 1280, tone: "text-cyber-yellow" },
  { name: "未来学家", score: 1024, tone: "text-cyber-blue" },
  { name: "AI小能手", score: 866, tone: "text-orange-400" },
];

export function StudyActivityRank() {
  return (
    <section className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
      <CyberCard className="min-h-[174px] overflow-hidden p-4">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-cyber-text">学习动态</h2>
          <MessageCircle size={20} className="text-cyber-blue" />
        </div>
        <div className="flex gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/90 bg-blue-glow text-sm font-black !text-white shadow-button-glow">
            AI
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-cyber-text">
              AI探索者 <span className="text-xs text-cyber-purple">Lv.4</span>
            </p>
            <p className="mt-1 text-xs leading-5 text-cyber-muted">
              刚刚学习了《初中数学提分课》
            </p>
            <p className="mt-3 text-xs leading-5 text-cyber-muted">
              课程内容非常实用，继续加油！
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-cyber-muted">
              <ThumbsUp size={14} className="text-cyber-blue" />
              56
            </div>
          </div>
        </div>
      </CyberCard>

      <CyberCard className="min-h-[174px] overflow-hidden p-4">
        <div className="absolute -right-8 top-4 h-24 w-24 rounded-full bg-[#FFE7C7]/80 blur-2xl" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-cyber-text">学习排行榜</h2>
          <Crown size={21} className="text-cyber-yellow" />
        </div>
        <div className="space-y-3">
          {ranks.map((rank, index) => (
            <div key={rank.name} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 text-sm font-black shadow-[0_6px_14px_rgba(90,105,160,0.08)] ${rank.tone}`}
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-cyber-text">{rank.name}</p>
                <p className="cyber-number text-xs text-cyber-muted">{rank.score} 学分</p>
              </div>
            </div>
          ))}
        </div>
      </CyberCard>
    </section>
  );
}
