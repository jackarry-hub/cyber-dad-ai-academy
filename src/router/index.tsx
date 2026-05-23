import { createBrowserRouter } from "react-router-dom";
import { AiExplainPage } from "../pages/AiExplainPage";
import { CoursePage } from "../pages/CoursePage";
import { HomePage } from "../pages/HomePage";
import { MistakeBookPage } from "../pages/MistakeBookPage";
import { PracticePage } from "../pages/PracticePage";
import { ProfilePage } from "../pages/ProfilePage";
import { QuestionImportPage } from "../pages/QuestionImportPage";
import { QuestionManagePage } from "../pages/QuestionManagePage";
import { ReportPage } from "../pages/ReportPage";
import { StagePage } from "../pages/StagePage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/stage", element: <StagePage /> },
  { path: "/stages", element: <StagePage /> },
  { path: "/courses", element: <CoursePage /> },
  { path: "/practice", element: <PracticePage /> },
  { path: "/question-import", element: <QuestionImportPage /> },
  { path: "/question-manage", element: <QuestionManagePage /> },
  { path: "/ai-explain", element: <AiExplainPage /> },
  { path: "/mistakes", element: <MistakeBookPage /> },
  { path: "/report", element: <ReportPage /> },
  { path: "/profile", element: <ProfilePage /> },
]);
