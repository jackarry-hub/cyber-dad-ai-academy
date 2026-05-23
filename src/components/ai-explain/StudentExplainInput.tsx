import { SendHorizonal } from "lucide-react";
import { GlowButton } from "../common/GlowButton";
import { CyberCard } from "../common/CyberCard";

const quickPrompts = [
  { label: "我不会做", text: "我不会做这道题，看到题目后不知道应该先用哪个知识点。" },
  { label: "我是猜的", text: "我是猜的，我没有完整列步骤，只是凭感觉选了这个答案。" },
  { label: "我卡在某一步", text: "我卡在某一步，前面的条件能看懂，但不知道下一步该怎么变形。" },
];

interface StudentExplainInputProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function StudentExplainInput({
  value,
  disabled = false,
  onChange,
  onSubmit,
}: StudentExplainInputProps) {
  function appendPrompt(text: string) {
    onChange(value.trim() ? `${value}\n${text}` : text);
  }

  return (
    <CyberCard className="p-4">
      <div className="mb-3">
        <p className="text-sm font-black text-cyber-text">第一步：把你的想法讲出来</p>
        <p className="mt-1 text-xs leading-5 text-cyber-muted">
          不用怕讲错，赛博老爸AI会根据你的思路帮你找问题。
        </p>
      </div>

      <textarea
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-40 w-full resize-none rounded-2xl border border-cyber-border bg-white/[0.82] p-3 text-sm leading-6 text-cyber-text shadow-[inset_0_1px_4px_rgba(90,105,160,0.08)] outline-none placeholder:text-cyber-weak disabled:opacity-60"
        placeholder="我是这样想的：我先看题目中的条件，然后我认为……所以我选择了……"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt.label}
            disabled={disabled}
            onClick={() => appendPrompt(prompt.text)}
            className="rounded-full border border-cyber-border bg-white/[0.78] px-3 py-1.5 text-xs font-bold text-cyber-blue shadow-[0_6px_14px_rgba(90,105,160,0.06)] disabled:opacity-50"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      <GlowButton
        className="mt-4 w-full"
        disabled={disabled || !value.trim()}
        onClick={onSubmit}
      >
        <SendHorizonal size={17} />
        让AI听我讲一遍
      </GlowButton>
    </CyberCard>
  );
}
