import type { AiAnalysis, Question } from "../types/question";

export function generateMockAiAnalysis(
  question: Question,
  studentExplanation: string,
): AiAnalysis {
  const reasonTag = inferReasonTag(question, studentExplanation);
  const point = question.knowledgePoints?.[0] ?? question.knowledgePoint;

  return {
    reasonTag,
    wrongStep: buildWrongStep(reasonTag, question),
    correctThinking: buildCorrectThinking(reasonTag, question),
    suggestion: buildSuggestion(reasonTag, point),
    variantTraining: `建议再练 3 道同类题，重点训练“${point}”和“条件提取”。`,
  };
}

export function getAiJudgement(analysis: AiAnalysis) {
  const judgementMap: Record<string, string> = {
    知识点不熟: "你的主要问题不是粗心，而是这类知识点还没有真正建立起来。",
    解题方法不明确: "你的主要问题不是不会算，而是还没有形成稳定的解题路线。",
    概念混淆: "你的主要问题不是答案记错了，而是把相近概念混在了一起。",
    等量关系没有找准: "你的主要问题不是计算能力，而是题目里的等量关系还没找准。",
    审题不清: "你的主要问题不是不会做，而是关键条件读得太快了。",
  };

  return judgementMap[analysis.reasonTag] ?? `你的主要问题集中在：${analysis.reasonTag}。`;
}

export function getDadReminder(analysis: AiAnalysis) {
  const reminderMap: Record<string, string> = {
    知识点不熟: "你不是笨，只是这块地基还没铺稳。先把概念讲清楚，再做题会轻很多。",
    解题方法不明确: "猜出来的答案不算真正会。把步骤讲出来，AI才能知道你真正卡在哪里。",
    概念混淆: "这类题不要急着算，先分清概念边界，再动笔。",
    等量关系没有找准: "方程题先找“谁等于谁”，关系找准了，后面只是计算。",
    审题不清: "错题不是失败，是提分入口。慢半拍读题，往往能少错一大半。",
  };

  return reminderMap[analysis.reasonTag] ?? "讲出来，AI才能知道你真正哪里没懂。";
}

function inferReasonTag(question: Question, studentExplanation: string) {
  const explanation = studentExplanation.trim();
  const knowledgePoint = question.knowledgePoint;

  if (explanation.includes("不会")) return "知识点不熟";
  if (explanation.includes("猜")) return "解题方法不明确";
  if (knowledgePoint.includes("分数")) return "概念混淆";
  if (knowledgePoint.includes("方程")) return "等量关系没有找准";
  return "审题不清";
}

function buildWrongStep(reasonTag: string, question: Question) {
  const knowledgePoint = question.knowledgePoints?.[0] ?? question.knowledgePoint;

  switch (reasonTag) {
    case "知识点不熟":
      return `你在讲解中没有说出“${knowledgePoint}”的关键规则，说明这一步还没有形成稳定记忆。`;
    case "解题方法不明确":
      return "你更像是在根据感觉选答案，没有先提取条件、建立关系，再一步步验证。";
    case "概念混淆":
      return "你可能把分子、分母或通分规则混在了一起，导致一开始的方向就偏了。";
    case "等量关系没有找准":
      return "你可能没有先找出题目中的等量关系，直接开始移项或计算，所以容易选错。";
    default:
      return "你可能忽略了题干里的关键词，导致后面的列式或判断没有跟题意对齐。";
  }
}

function buildCorrectThinking(reasonTag: string, question: Question) {
  if (question.knowledgePoint.includes("分数")) {
    return "先看分母是否相同，不同分母先通分，再进行加减，最后检查能不能约分。";
  }

  if (question.knowledgePoint.includes("方程")) {
    return "先把题目关系翻译成等式，再用等式性质移项、合并同类项，最后检验答案。";
  }

  if (reasonTag === "解题方法不明确") {
    return "先写出已知条件和要求的问题，再选择对应方法，不靠猜测做判断。";
  }

  return "先圈出题干关键词，再列出条件关系，最后根据知识点规则一步步推到答案。";
}

function buildSuggestion(reasonTag: string, knowledgePoint: string) {
  switch (reasonTag) {
    case "知识点不熟":
      return `先复习“${knowledgePoint}”的基础定义和例题 5 分钟，再做同类基础题。`;
    case "解题方法不明确":
      return `用“读题-找条件-列关系-验证”的四步法重做 3 道“${knowledgePoint}”题。`;
    case "概念混淆":
      return `把“${knowledgePoint}”相关概念做成对比卡片，重点区分相似步骤。`;
    case "等量关系没有找准":
      return `复习“${knowledgePoint}”里的等量关系表达，先练列式，再练计算。`;
    default:
      return `复习“${knowledgePoint}”的关键词识别，做题前先用一句话说清题目问什么。`;
  }
}
