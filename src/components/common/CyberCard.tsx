import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface CyberCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function CyberCard({ className, glow = false, ...props }: CyberCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[22px] border border-white/90 bg-cyber-card backdrop-blur-xl",
        "shadow-card-inner before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[linear-gradient(135deg,rgba(255,255,255,0.42),transparent_40%,rgba(196,181,253,0.08))]",
        glow && "shadow-glow-soft",
        className,
      )}
      {...props}
    />
  );
}
