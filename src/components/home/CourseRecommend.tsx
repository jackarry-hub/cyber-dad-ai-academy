import { Star } from "lucide-react";
import { CyberCard } from "../common/CyberCard";
import { SectionHeader } from "../common/SectionHeader";

const homeCourses = [
  {
    tag: "HOT",
    title: "小学数学同步练",
    stage: "小学",
    lessons: 24,
    learners: "2.4w",
    rating: 4.9,
    accent: "from-[#EEF7FF] to-[#F8FBFF]",
  },
  {
    tag: "HOT",
    title: "初中数学提分课",
    stage: "初中",
    lessons: 18,
    learners: "1.8w",
    rating: 4.8,
    accent: "from-[#EEF2FF] to-[#F7F3FF]",
  },
  {
    tag: "NEW",
    title: "英语单词闯关",
    stage: "小学/初中",
    lessons: 16,
    learners: "1.2w",
    rating: 4.8,
    accent: "from-[#FFF1F7] to-[#FFF7ED]",
  },
  {
    tag: "NEW",
    title: "语文阅读理解",
    stage: "初中",
    lessons: 14,
    learners: "8.8k",
    rating: 4.7,
    accent: "from-[#F0FDF4] to-[#EEF6FF]",
  },
];

export function CourseRecommend() {
  return (
    <section>
      <SectionHeader title="为你推荐" action="更多">
        <div className="flex gap-4 text-xs text-slate-400">
          <span className="text-cyber-purple">热门课程</span>
          <span>同步练习</span>
          <span>提分计划</span>
        </div>
      </SectionHeader>
      <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {homeCourses.map((course) => (
          <CyberCard key={course.title} className="w-[176px] shrink-0 overflow-hidden rounded-[18px]">
            <div
              className={`relative h-[112px] bg-gradient-to-br ${course.accent} p-3`}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/70 shadow-[0_8px_24px_rgba(90,105,160,0.08)]" />
              <div className="absolute bottom-2 right-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/90 bg-white/[0.78] text-2xl font-black text-cyber-purple shadow-[0_8px_18px_rgba(90,105,160,0.1)]">
                AI
              </div>
              <span className="rounded-full bg-[#FFD166] px-2 py-0.5 text-[10px] font-black text-[#17233D]">
                {course.tag}
              </span>
              <p className="mt-4 line-clamp-2 pr-12 text-base font-black leading-tight text-cyber-text">
                {course.title}
              </p>
            </div>
            <div className="p-3">
              <p className="line-clamp-1 text-sm font-semibold text-cyber-text">{course.title}</p>
              <p className="mt-2 text-xs text-cyber-muted">
                {course.stage} · {course.lessons} 课时
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-cyber-blue">{course.learners} 人学习</span>
                <span className="inline-flex items-center gap-1 text-cyber-gold">
                  <Star size={13} fill="currentColor" />
                  {course.rating}
                </span>
              </div>
            </div>
          </CyberCard>
        ))}
      </div>
    </section>
  );
}
