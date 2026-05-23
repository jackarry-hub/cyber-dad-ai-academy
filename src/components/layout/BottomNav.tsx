import { BookOpen, Bot, GraduationCap, Home, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

const navItems = [
  { label: "首页", path: "/", icon: Home },
  { label: "课程", path: "/stage", icon: BookOpen },
  { label: "学习", path: "/practice", icon: GraduationCap },
  { label: "AI讲题", path: "/ai-explain", icon: Bot },
  { label: "我的", path: "/profile", icon: UserRound },
];

export function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] px-3">
      <div className="grid h-[78px] grid-cols-5 overflow-hidden rounded-t-[28px] border border-white/90 bg-white/[0.88] shadow-[0_-12px_32px_rgba(90,105,160,0.16)] backdrop-blur-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "relative flex flex-col items-center justify-center gap-1 text-[11px] text-[#8490AA] transition",
                  isActive &&
                    "bg-[linear-gradient(180deg,rgba(123,97,255,0.14),rgba(59,130,246,0.06))] text-cyber-purple shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] before:absolute before:top-0 before:h-1 before:w-9 before:rounded-b-full before:bg-blue-glow before:shadow-glow-blue",
                )
              }
            >
              <Icon size={22} strokeWidth={2.25} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
