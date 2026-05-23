import { cn } from "../../utils/cn";

interface ProgressBarProps {
  value?: number;
  progress?: number;
  className?: string;
}

export function ProgressBar({ value, progress, className }: ProgressBarProps) {
  const width = Math.max(0, Math.min(100, progress ?? value ?? 0));

  return (
    <div
      className={cn(
        "h-2.5 overflow-hidden rounded-full border border-white/80 bg-[#EEF2FF] shadow-[inset_0_1px_4px_rgba(90,105,160,0.12)]",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-blue-glow shadow-[0_6px_16px_rgba(91,124,242,0.22)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
