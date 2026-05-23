import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface MobileShellProps {
  children: ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-cyber-radial text-cyber-text">
      <main className="cyber-grid relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-cyber-radial px-4 pb-[118px] pt-4 sm:px-5">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-28 rounded-full bg-white/[0.55] blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-52 h-56 w-56 rounded-full bg-cyber-purple/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 cyber-scanline opacity-45" />
        <div className="relative z-10">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
