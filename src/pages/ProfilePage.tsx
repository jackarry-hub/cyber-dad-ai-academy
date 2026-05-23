import {
  Bell,
  ChevronRight,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CyberCard } from "../components/common/CyberCard";
import { SectionHeader } from "../components/common/SectionHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { mockUser } from "../data/mockUser";

const settings = [
  { label: "学习偏好", icon: Settings },
  { label: "题库导入", icon: FileSpreadsheet, path: "/question-import" },
  { label: "题库管理", icon: FileSpreadsheet, path: "/question-manage" },
  { label: "消息提醒", icon: Bell },
  { label: "家长端入口预留", icon: UsersRound },
  { label: "教师端入口预留", icon: ShieldCheck },
];

export function ProfilePage() {
  return (
    <MobileShell>
      <div className="space-y-5">
        <SectionHeader title="我的" />

        <CyberCard className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/90 bg-blue-glow text-3xl font-black !text-white shadow-button-glow">
              {mockUser.avatarText}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-black text-cyber-text">{mockUser.name}</h1>
              <p className="mt-1 text-sm text-cyber-blue">{mockUser.grade}</p>
              <p className="mt-1 text-xs text-cyber-muted">{mockUser.level}</p>
            </div>
          </div>
        </CyberCard>

        <div className="grid grid-cols-3 gap-3">
          <CyberCard className="p-4 text-center">
            <Trophy className="mx-auto text-cyber-gold" size={22} />
            <p className="mt-2 text-lg font-black text-cyber-text">{mockUser.points}</p>
            <p className="text-xs text-cyber-muted">积分</p>
          </CyberCard>
          <CyberCard className="p-4 text-center">
            <p className="text-lg font-black text-cyber-text">{mockUser.streakDays}</p>
            <p className="mt-2 text-xs text-cyber-muted">连续学习</p>
          </CyberCard>
          <CyberCard className="p-4 text-center">
            <p className="text-lg font-black text-cyber-text">A</p>
            <p className="mt-2 text-xs text-cyber-muted">学习评级</p>
          </CyberCard>
        </div>

        <CyberCard className="divide-y divide-cyber-border overflow-hidden">
          {settings.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={20} className="text-cyber-cyan" />
                <span className="flex-1 text-sm text-cyber-text">{item.label}</span>
                <ChevronRight size={17} className="text-slate-500" />
              </>
            );

            if (item.path) {
              return (
                <Link key={item.label} to={item.path} className="flex w-full items-center gap-3 px-4 py-4 text-left">
                  {content}
                </Link>
              );
            }

            return (
              <button key={item.label} className="flex w-full items-center gap-3 px-4 py-4 text-left">
                {content}
              </button>
            );
          })}
        </CyberCard>
      </div>
    </MobileShell>
  );
}
