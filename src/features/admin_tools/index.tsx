import { useState } from "react";
import { LessonSideBar } from "./lesson_side_bar";
import { ThemeSideBar } from "./theme_side_bar";
import { InteractiveFeedbacks } from "@/core/components/interactive_feedbacks";
import { useAdminViewModelContext } from "../theme_page/view_model/context_providers/admin_view_model";
import { useBaseViewModelContext } from "../theme_page/view_model/context_providers/base_view_model";

export function AdminTools() {
  const { stalling, snackbar, setSnackbar } = useAdminViewModelContext()!;
  const { activeLesson } = useBaseViewModelContext()!;
  const [isThemeSideBarOpen, setIsThemeSideBarOpen] = useState(false);
  const [isLessonSideBarOpen, setIsLessonSideBarOpen] = useState(false);

  return (
    <>
      <ThemeSideBar
        hide={isLessonSideBarOpen}
        isOpen={isThemeSideBarOpen}
        setIsOpen={setIsThemeSideBarOpen}
      />
      {activeLesson !== null && (
        <LessonSideBar
          hide={isThemeSideBarOpen}
          isOpen={isLessonSideBarOpen}
          setIsOpen={setIsLessonSideBarOpen}
          activeLesson={activeLesson}
        />
      )}
      <InteractiveFeedbacks
        stalling={stalling}
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
    </>
  );
}
