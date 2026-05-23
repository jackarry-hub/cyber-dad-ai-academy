import { useMemo, useState, type ChangeEvent } from "react";
import { AlertCircle, CheckCircle2, FileSpreadsheet, Trash2, UploadCloud } from "lucide-react";
import { CyberCard } from "../components/common/CyberCard";
import { GlowButton } from "../components/common/GlowButton";
import { SectionHeader } from "../components/common/SectionHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { difficultyLabels, stageLabelsForPractice } from "../data/mockQuestions";
import type { Question } from "../types/question";
import { parseQuestionBankWorkbook } from "../utils/importQuestionBank";
import {
  clearImportedQuestions,
  getImportedQuestions,
  saveImportedQuestions,
} from "../utils/storage";

export function QuestionImportPage() {
  const initialCount = useMemo(() => getImportedQuestions().length, []);
  const [importedCount, setImportedCount] = useState(initialCount);
  const [fileName, setFileName] = useState("");
  const [previewQuestions, setPreviewQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setMessage("");
    setPreviewQuestions([]);
    setErrors([]);

    if (!file) return;

    setFileName(file.name);

    if (!file.name.endsWith(".xlsx")) {
      setErrors(["请上传 .xlsx 格式的 Excel 题库文件"]);
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const result = await parseQuestionBankWorkbook(buffer);
      setPreviewQuestions(result.questions);
      setErrors(result.errors);
      setMessage(`成功解析 ${result.questions.length} 道题`);
    } catch {
      setErrors(["文件读取失败，请检查 Excel 文件是否损坏或格式是否正确"]);
    }
  }

  function saveQuestions() {
    saveImportedQuestions(previewQuestions);
    setImportedCount(previewQuestions.length);
    setMessage(`已保存 ${previewQuestions.length} 道导入题目，练习页将优先使用导入题库`);
  }

  function clearQuestions() {
    clearImportedQuestions();
    setImportedCount(0);
    setMessage("已清空导入题库，练习页将恢复使用 mock 题库");
  }

  return (
    <MobileShell>
      <div className="space-y-5">
        <SectionHeader title="题库导入" action="Excel" />

        <CyberCard className="overflow-hidden p-4" glow>
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#DBEAFE]/70 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/90 bg-[#EEF2FF] text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black text-cyber-text">导入 Excel 题库</h1>
                <p className="mt-1 text-xs leading-5 text-cyber-muted">
                  支持 .xlsx 文件，本地解析并保存到浏览器 localStorage。
                </p>
              </div>
            </div>

            <label className="mt-5 flex min-h-[126px] cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed border-[#D9D2FF] bg-white/[0.72] p-4 text-center shadow-[0_8px_18px_rgba(90,105,160,0.08)]">
              <UploadCloud className="text-cyber-purple" size={30} />
              <span className="mt-2 text-sm font-black text-cyber-text">
                选择 .xlsx 题库文件
              </span>
              <span className="mt-1 text-xs text-cyber-muted">
                字段需包含：学段、年级、学科、题干、选项、答案、解析
              </span>
              <input
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {fileName && <p className="mt-3 text-xs text-cyber-muted">当前文件：{fileName}</p>}
          </div>
        </CyberCard>

        <div className="grid grid-cols-2 gap-3">
          <CyberCard className="p-4 text-center">
            <p className="text-xs text-cyber-muted">当前已导入</p>
            <p className="cyber-number mt-2 text-2xl font-black text-cyber-text">
              {importedCount}
            </p>
            <p className="text-xs text-cyber-muted">道题</p>
          </CyberCard>
          <CyberCard className="p-4 text-center">
            <p className="text-xs text-cyber-muted">本次解析</p>
            <p className="cyber-number mt-2 text-2xl font-black text-cyber-text">
              {previewQuestions.length}
            </p>
            <p className="text-xs text-cyber-muted">道题</p>
          </CyberCard>
        </div>

        {message && (
          <CyberCard className="border-cyber-green/35 bg-cyber-green/10 p-3">
            <div className="flex items-center gap-2 text-sm font-bold text-cyber-green">
              <CheckCircle2 size={18} />
              {message}
            </div>
          </CyberCard>
        )}

        {errors.length > 0 && (
          <CyberCard className="border-cyber-red/30 bg-cyber-red/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-cyber-red">
              <AlertCircle size={18} />
              需要检查的内容
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
              {errors.map((error) => (
                <p key={error} className="text-xs leading-5 text-cyber-muted">
                  {error}
                </p>
              ))}
            </div>
          </CyberCard>
        )}

        {previewQuestions.length > 0 && (
          <CyberCard className="p-4">
            <h2 className="font-black text-cyber-text">题目预览</h2>
            <div className="mt-3 space-y-3">
              {previewQuestions.slice(0, 6).map((question) => (
                <div
                  key={question.id}
                  className="rounded-2xl border border-white/90 bg-white/[0.72] p-3 shadow-[0_6px_14px_rgba(90,105,160,0.06)]"
                >
                  <p className="text-xs font-bold text-cyber-blue">
                    {stageLabelsForPractice[question.stage]} · {question.grade} ·{" "}
                    {question.subject}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-black leading-6 text-cyber-text">
                    {question.stem}
                  </p>
                  <p className="mt-1 text-xs text-cyber-muted">
                    {question.bankTitle} · {question.knowledgePoint} ·{" "}
                    {difficultyLabels[question.difficulty]}
                  </p>
                </div>
              ))}
            </div>
            {previewQuestions.length > 6 && (
              <p className="mt-3 text-xs text-cyber-muted">
                仅展示前 6 道，保存后练习页会读取全部导入题目。
              </p>
            )}
          </CyberCard>
        )}

        <div className="grid grid-cols-1 gap-3">
          <GlowButton disabled={previewQuestions.length === 0} onClick={saveQuestions}>
            保存题库
          </GlowButton>
          <GlowButton tone="ghost" onClick={clearQuestions}>
            <Trash2 size={17} />
            清空导入题库
          </GlowButton>
        </div>
      </div>
    </MobileShell>
  );
}
