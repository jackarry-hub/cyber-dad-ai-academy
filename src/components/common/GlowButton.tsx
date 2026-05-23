import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "primary" | "ghost";
}

export function GlowButton({ className, tone = "primary", ...props }: GlowButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        tone === "primary" &&
          "bg-blue-glow !text-white shadow-button-glow hover:shadow-glow-blue",
        tone === "ghost" &&
          "border border-cyber-border bg-white/80 text-cyber-blue shadow-card-inner hover:bg-white",
        className,
      )}
      {...props}
    />
  );
}
