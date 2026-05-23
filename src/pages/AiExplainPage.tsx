import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AiAnalysisReport } from "../components/ai-explain/AiAnalysisReport";
import { AiExplainHero } from "../components/ai-explain/AiExplainHero";
import { AnalysisProcess } from "../components/ai-explain/AnalysisProcess";
import { NextLearningTasks } from "../components/ai-explain/NextLearningTasks";
import { StudentExplainInput } from "../components/ai-explain/StudentExplainInput";
import { WrongQuestionCard } from "../components/ai-explain/WrongQuestionCard";
import { CyberCard } from "../components/common/CyberCard";
import { MobileShell } from "../components/layout/MobileShell";
import { mockQuestions } from "../data/mockQuestions";
import type { AiAnalysis, CurrentWrongQuestion, MistakeRecord, Question } from "../types/question";
import { generateMockAiAnalysis } from "../utils/aiAnalysis";
import {
  getCurrentWrongQuestion,
  saveCurrentWrongQuestion,
  saveMistakeRecord,
} from "../utils/storage";

type AnalysisStatus = "idle" | "analyzing" | "done";

export function AiExplainPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const timers = useRef<number[]>([]);
  const stateWrong = location.state as CurrentWrongQuestion | null;
  const forceDemo = searchParams.get("demo") === "1";

  const { wrongQuestion, isDemo } = useMemo(() => {
    if (stateWrong && !forceDemo) {
      saveCurrentWrongQuestion(stateWrong);
      return { wrongQuestion: stateWrong, isDemo: false };
    }

    const stored = getCurrentWrongQuestion();
    if (stored && !forceDemo) {
      return { wrongQuestion: stored, isDemo: false };
    }

    return { wrongQuestion: createDemoWrongQuestion(), isDemo: true };
  }, [forceDemo, stateWrong]);

  const question = wrongQuestion.question;
  const [studentExplanation, setStudentExplanation] = useState("");
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [saved, setSaved] = useState(false);
  const practicePath = `/practice?stage=${question.stage}&subject=${encodeURIComponent(
    question.subject,
  )}&bank=${question.bankId ?? ""}`;

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  function submitToAi() {
    if (!studentExplanation.trim()) return;

    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setAnalysis(null);
    setSaved(false);
    setAnalysisStatus("analyzing");
    setActiveStep(0);

    timers.current.push(window.setTimeout(() => setActiveStep(1), 420));
    timers.current.push(window.setTimeout(() => setActiveStep(2), 840));
    timers.current.push(
      window.setTimeout(() => {
        const nextAnalysis = generateMockAiAnalysis(question, studentExplanation);
        const mistakeRecord: MistakeRecord = {
          id: `mistake-${question.id}-${Date.now()}`,
          question,
          selectedAnswer: wrongQuestion.selectedAnswer,
          correctAnswer: wrongQuestion.correctAnswer,
          studentExplanation,
          aiAnalysis: nextAnalysis,
          createdAt: new Date().toISOString(),
        };

        if (!isDemo) {
          saveMistakeRecord(mistakeRecord);
        }

        setAnalysis(nextAnalysis);
        setAnalysisStatus("done");
        setActiveStep(2);
        setSaved(!isDemo);
      }, 1150),
    );
  }

  return (
    <MobileShell>
      <div className="space-y-5">
        <AiExplainHero />

        {saved && (
          <CyberCard className="border-cyber-green/35 bg-cyber-green/10 p-3">
            <div className="flex items-center gap-2 text-sm font-bold text-cyber-green">
              <CheckCircle2 size={18} />
              错题已同步到错题本
            </div>
          </CyberCard>
        )}

        <WrongQuestionCard wrongQuestion={wrongQuestion} isDemo={isDemo} />

        <StudentExplainInput
          value={studentExplanation}
          disabled={analysisStatus === "analyzing"}
          onChange={setStudentExplanation}
          onSubmit={submitToAi}
        />

        <AnalysisProcess
          visible={analysisStatus !== "idle"}
          activeStep={activeStep}
          done={analysisStatus === "done"}
        />

        <AiAnalysisReport analysis={analysis} />

        <NextLearningTasks visible={analysisStatus === "done"} practicePath={practicePath} />
      </div>
    </MobileShell>
  );
}

function createDemoWrongQuestion(): CurrentWrongQuestion {
  const question =
    mockQuestions.find((item) => item.knowledgePoint.includes("分数")) ??
    mockQuestions.find((item) => item.knowledgePoint.includes("方程")) ??
    mockQuestions[0];

  return {
    id: `demo-wrong-${question.id}`,
    question,
    selectedAnswer: getDemoWrongAnswer(question),
    correctAnswer: question.answer,
    createdAt: new Date().toISOString(),
  };
}

function getDemoWrongAnswer(question: Question) {
  return ["A", "B", "C", "D"].find((answer) => answer !== question.answer) ?? "A";
}
