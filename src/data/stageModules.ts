export type LearningStage = "preschool" | "primary" | "middle";

export interface LearningModule {
  id: string;
  title: string;
  desc: string;
  icon: string;
  path?: string;
  status: "available" | "coming-soon";
}

export interface StageModule {
  id: string;
  title: string;
  stage: LearningStage;
  ageRange: string;
  description: string;
  theme: string;
  modules: LearningModule[];
}

export const stageModules: StageModule[] = [
  {
    id: "preschool",
    title: "幼小衔接",
    stage: "preschool",
    ageRange: "3-6岁 / 幼儿园大班 / 入学准备",
    description: "用画画、游戏和故事，陪孩子轻松完成入学准备。",
    theme: "from-cyan-300/22 via-cyber-blue/10 to-cyber-yellow/12",
    modules: [
      {
        id: "ai-painting",
        title: "AI绘画启蒙",
        desc: "画出孩子心中的故事世界",
        icon: "palette",
        status: "coming-soon",
      },
      {
        id: "literacy",
        title: "识字启蒙",
        desc: "常用汉字认读与趣味记忆",
        icon: "book-a",
        status: "coming-soon",
      },
      {
        id: "pinyin",
        title: "拼音启蒙",
        desc: "声母韵母入门训练",
        icon: "speech",
        status: "coming-soon",
      },
      {
        id: "math-starter",
        title: "数学启蒙",
        desc: "数字、数量、图形、比较",
        icon: "shapes",
        status: "coming-soon",
      },
      {
        id: "english-starter",
        title: "英语启蒙",
        desc: "字母、单词和简单表达",
        icon: "languages",
        status: "coming-soon",
      },
      {
        id: "picture-speaking",
        title: "看图说话",
        desc: "培养表达能力和观察能力",
        icon: "image",
        status: "coming-soon",
      },
      {
        id: "focus-training",
        title: "专注力训练",
        desc: "通过小游戏提升注意力",
        icon: "target",
        status: "coming-soon",
      },
    ],
  },
  {
    id: "primary",
    title: "小学同步",
    stage: "primary",
    ageRange: "1-6年级",
    description: "同步课堂知识，练习、讲题、错因分析一站完成。",
    theme: "from-cyber-cyan/24 via-cyber-blue/12 to-cyber-green/10",
    modules: [
      {
        id: "chinese-sync",
        title: "语文同步",
        desc: "字词句、阅读和表达同步巩固",
        icon: "book-open",
        status: "coming-soon",
      },
      {
        id: "math-sync",
        title: "数学同步",
        desc: "课堂知识点同步练习",
        icon: "calculator",
        path: "/practice?stage=primary",
        status: "available",
      },
      {
        id: "english-sync",
        title: "英语同步",
        desc: "单词、句型和基础表达",
        icon: "languages",
        status: "coming-soon",
      },
      {
        id: "after-class",
        title: "课后练习",
        desc: "每日巩固课堂重点",
        icon: "pencil",
        path: "/practice?stage=primary",
        status: "available",
      },
      {
        id: "mistakes",
        title: "错题本",
        desc: "错题沉淀与复盘",
        icon: "brain",
        path: "/mistakes",
        status: "available",
      },
      {
        id: "ai-explain",
        title: "我给AI讲习题",
        desc: "把思路讲给AI，定位错因",
        icon: "bot",
        path: "/ai-explain",
        status: "available",
      },
      {
        id: "daily-plan",
        title: "每日学习计划",
        desc: "按薄弱点安排今日任务",
        icon: "calendar",
        path: "/report",
        status: "available",
      },
    ],
  },
  {
    id: "middle",
    title: "初中提分",
    stage: "middle",
    ageRange: "7-9年级 / 中考备考",
    description: "围绕薄弱知识点和中考题型，制定提分路径。",
    theme: "from-cyber-purple/22 via-cyber-blue/12 to-cyber-cyan/10",
    modules: [
      {
        id: "middle-chinese",
        title: "语文",
        desc: "阅读理解与作文表达",
        icon: "book-open",
        status: "coming-soon",
      },
      {
        id: "middle-math",
        title: "数学",
        desc: "方程、函数、几何专题训练",
        icon: "calculator",
        path: "/practice?stage=middle",
        status: "available",
      },
      {
        id: "middle-english",
        title: "英语",
        desc: "词汇、语法和阅读训练",
        icon: "languages",
        status: "coming-soon",
      },
      {
        id: "physics",
        title: "物理",
        desc: "概念理解与实验题型",
        icon: "atom",
        status: "coming-soon",
      },
      {
        id: "chemistry",
        title: "化学",
        desc: "基础概念与方程式",
        icon: "flask",
        status: "coming-soon",
      },
      {
        id: "history",
        title: "历史",
        desc: "时间线和材料题训练",
        icon: "scroll",
        status: "coming-soon",
      },
      {
        id: "morality-law",
        title: "道法",
        desc: "核心观点和情境题",
        icon: "scale",
        status: "coming-soon",
      },
      {
        id: "biology",
        title: "生物",
        desc: "知识图谱与识图题",
        icon: "leaf",
        status: "coming-soon",
      },
      {
        id: "geography",
        title: "地理",
        desc: "地图判读与区域分析",
        icon: "map",
        status: "coming-soon",
      },
      {
        id: "exam-topic",
        title: "中考专题",
        desc: "高频题型和考点突破",
        icon: "trophy",
        path: "/practice?stage=middle",
        status: "available",
      },
      {
        id: "reason-analysis",
        title: "错因分析",
        desc: "定位薄弱点和失分原因",
        icon: "brain",
        path: "/report",
        status: "available",
      },
      {
        id: "variant-training",
        title: "变式训练",
        desc: "同类题迁移训练",
        icon: "repeat",
        path: "/practice?stage=middle",
        status: "available",
      },
      {
        id: "middle-ai-explain",
        title: "我给AI讲习题",
        desc: "讲思路、找错因、补方法",
        icon: "bot",
        path: "/ai-explain",
        status: "available",
      },
    ],
  },
];

export const stageModuleMap = stageModules.reduce<Record<LearningStage, StageModule>>(
  (map, stage) => {
    map[stage.stage] = stage;
    return map;
  },
  {} as Record<LearningStage, StageModule>,
);

export function normalizeLearningStage(value: string | null): LearningStage | null {
  if (value === "bridge") return "preschool";
  if (value === "preschool" || value === "primary" || value === "middle") {
    return value;
  }
  return null;
}
