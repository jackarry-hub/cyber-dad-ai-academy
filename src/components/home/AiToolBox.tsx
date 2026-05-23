import { BrainCircuit, Brush, FileCheck2, PencilLine } from "lucide-react";
import { CyberCard } from "../common/CyberCard";
import { SectionHeader } from "../common/SectionHeader";

const tools = [
  { title: "AI写作", desc: "帮你打开思路", icon: PencilLine, tone: "from-[#EEF7FF] to-[#F8FBFF]", iconTone: "bg-[#DBEAFE] text-[#3B82F6]" },
  { title: "AI绘画", desc: "把想法画出来", icon: Brush, tone: "from-[#FFF1F7] to-[#FFF7ED]", iconTone: "bg-[#FCE7F3] text-[#EC4899]" },
  { title: "作文批改", desc: "结构表达优化", icon: FileCheck2, tone: "from-[#F0FDF4] to-[#F8FBFF]", iconTone: "bg-[#DCFCE7] text-[#16A34A]" },
  { title: "错因分析", desc: "定位薄弱知识点", icon: BrainCircuit, tone: "from-[#FFF4E8] to-[#FFF9F0]", iconTone: "bg-[#FFEDD5] text-[#F97316]" },
];

export function AiToolBox() {
  return (
    <section>
      <SectionHeader title="AI工具箱" action="更多工具" />
      <div className="grid grid-cols-2 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <CyberCard key={tool.title} className={`flex min-h-[80px] items-center justify-between overflow-hidden bg-gradient-to-br p-4 ${tool.tone}`}>
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/[0.65] blur-2xl" />
              <div>
                <p className="text-sm font-bold text-cyber-text">{tool.title}</p>
                <p className="mt-1 text-xs text-cyber-muted">{tool.desc}</p>
              </div>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/90 shadow-[0_8px_18px_rgba(90,105,160,0.1)] ${tool.iconTone}`}>
                <Icon size={22} />
              </div>
            </CyberCard>
          );
        })}
      </div>
    </section>
  );
}
