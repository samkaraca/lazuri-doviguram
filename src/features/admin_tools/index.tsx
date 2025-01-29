import { useState } from "react";
import { LessonSideBar } from "./lesson_side_bar";
import { ThemeSideBar } from "./theme_side_bar";
import { InteractiveFeedbacks } from "@/components/interactive_feedbacks";

export default function AdminTools() {
  // const { stalling, snackbar, setSnackbar } = useAdminViewModelContext()!;
  const [isThemeSideBarOpen, setIsThemeSideBarOpen] = useState(false);
  const [isLessonSideBarOpen, setIsLessonSideBarOpen] = useState(false);

  return (
    <>
      <ThemeSideBar
        hide={isLessonSideBarOpen}
        isOpen={isThemeSideBarOpen}
        setIsOpen={setIsThemeSideBarOpen}
      />
      <LessonSideBar
        hide={isThemeSideBarOpen}
        isOpen={isLessonSideBarOpen}
        setIsOpen={setIsLessonSideBarOpen}
      />
      {/* <InteractiveFeedbacks
        stalling={stalling}
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      /> */}
    </>
  );
}
