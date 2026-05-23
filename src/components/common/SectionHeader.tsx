import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  action?: string;
  children?: ReactNode;
}

export function SectionHeader({ title, action, children }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-blue-glow shadow-glow-blue" />
          <h2 className="text-lg font-black tracking-normal text-cyber-text">{title}</h2>
        </div>
        {children && <div className="mt-2">{children}</div>}
      </div>
      {action && (
        <button className="inline-flex shrink-0 items-center gap-1 rounded-full border border-cyber-border bg-white/[0.78] px-2.5 py-1 text-xs text-cyber-blue shadow-[0_6px_18px_rgba(90,105,160,0.08)]">
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
