import { CalendarCheck, Target } from "lucide-react";
import { mockReport } from "../../data/mockReports";
import { CyberCard } from "../common/CyberCard";
import { ProgressBar } from "../common/ProgressBar";
import { SectionHeader } from "../common/SectionHeader";

export function LearningStatus() {
  return (
    <section>
      <SectionHeader title="我的学习" action="学习计划" />
      <div className="grid grid-cols-2 gap-3">
        <CyberCard className="overflow-hidden p-4">
          <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#DBEAFE]/70 blur-2xl" />
          <div className="mb-3 flex items-center gap-2 text-cyber-blue">
            <CalendarCheck size={18} />
            <span className="text-sm font-bold">AI成长计划 · Lv.3</span>
          </div>
          <ProgressBar progress={65} />
          <p className="mt-3 text-xs text-cyber-muted">
            学习进度 <span className="cyber-number font-black text-cyber-cyan">65%</span>
          </p>
          <p className="mt-1 text-[11px] text-cyber-weak">已学 18 / 28 课时</p>
        </CyberCard>

        <CyberCard className="overflow-hidden p-4">
          <div className="absolute -right-5 bottom-0 h-20 w-20 rounded-full bg-[#EDE9FE]/80 blur-2xl" />
          <div className="mb-3 flex items-center gap-2 text-cyber-purple">
            <Target size={18} />
            <span className="text-sm font-bold">今日学习目标</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="cyber-number text-3xl font-black text-cyber-text">2</span>
            <span className="pb-1 text-sm text-cyber-muted">/ 3 课时</span>
          </div>
          <ProgressBar progress={66} className="mt-3" />
          <p className="mt-2 text-[11px] leading-4 text-cyber-weak">{mockReport.goalText}</p>
        </CyberCard>
      </div>
    </section>
  );
}
