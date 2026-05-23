import { AiToolBox } from "../components/home/AiToolBox";
import { CourseRecommend } from "../components/home/CourseRecommend";
import { HomeHero } from "../components/home/HomeHero";
import { LearningStatus } from "../components/home/LearningStatus";
import { QuickEntryGrid } from "../components/home/QuickEntryGrid";
import { StudyActivityRank } from "../components/home/StudyActivityRank";
import { MobileShell } from "../components/layout/MobileShell";

export function HomePage() {
  return (
    <MobileShell>
      <div className="space-y-5">
        <HomeHero />
        <QuickEntryGrid />
        <LearningStatus />
        <CourseRecommend />
        <AiToolBox />
        <StudyActivityRank />
      </div>
    </MobileShell>
  );
}
