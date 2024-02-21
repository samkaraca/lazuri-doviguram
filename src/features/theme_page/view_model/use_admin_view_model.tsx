import { useBaseViewModelContext } from "./context_providers/base_view_model";
import { AdminViewModel } from "../model/admin_view_model";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultLesson } from "@/lib/lesson/default_lesson";
import { ApiResponse } from "@/api/api_response";
import { defaultActivity } from "@/lib/activity/default_activity";
import { slugifyLaz } from "@/utils/slugify_laz";
import { ThemeAdminService } from "@/api/admin_theme_api";
import ILesson from "@/lib/lesson/lesson";

export function useAdminViewModel(): AdminViewModel {
  const {
    id,
    title,
    lessons,
    activeLesson,
    createdAt,
    setId,
    setTitle,
    setExplanation,
    setImage,
    setYoutubeVideoUrl,
    setLessons,
    setActiveLesson,
  } = useBaseViewModelContext()!;
  const { replace } = useRouter();
  const adminService = useRef(new ThemeAdminService());
  const [stalling, setStalling] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    severity: "error" | "success" | "warning" | "info";
    message: string;
    visible: boolean;
  }>({ severity: "info", message: "", visible: false });

  async function withFeedback<T>(
    process: () => Promise<ApiResponse<T>>,
    success: (res: ApiResponse<T>) => void
  ): Promise<void> {
    setStalling(true);
    const res = await process();
    setStalling(false);

    if (res.status === "error") {
      setSnackbar({
        severity: res.status,
        message: res.message,
        visible: true,
      });
      return;
    }
    setSnackbar({
      severity: res.status,
      message: res.message,
      visible: true,
    });
    success(res);
    return;
  }

  const saveTheme = async (
    newTitle: string,
    newExplanation: string,
    newImage: string,
    newYoutubeVideoUrl: string
  ) => {
    if (title !== newTitle) {
      const newId = slugifyLaz(newTitle);
      withFeedback(
        () =>
          adminService.current.relocateTheme(id, {
            id: newId,
            title: newTitle,
            explanation: newExplanation,
            image: newImage,
            youtubeVideoUrl: newYoutubeVideoUrl,
            createdAt,
            lessons,
          }),
        (res) => {
          setId(newId);
          setTitle(newTitle);
          setExplanation(newExplanation);
          setImage(newImage);
          setYoutubeVideoUrl(newYoutubeVideoUrl);
          replace(`/admin/temalar/${newId}`);
        }
      );
    } else {
      withFeedback(
        () =>
          adminService.current.saveTheme({
            id,
            explanation: newExplanation,
            image: newImage,
            youtubeVideoUrl: newYoutubeVideoUrl,
          }),
        (res) => {
          setExplanation(newExplanation);
          setImage(newImage);
          setYoutubeVideoUrl(newYoutubeVideoUrl);
        }
      );
    }
  };

  const deleteTheme = async () => {
    withFeedback(
      () => adminService.current.deleteTheme(id),
      (res) => replace("/admin")
    );
  };

  const saveLesson = async (lesson: Omit<ILesson, "activities">) => {
    if (activeLesson === null) return;
    await withFeedback(
      () => adminService.current.saveLesson(id, lesson),
      () => {
        setLessons((prev) => {
          const newLessons = [...prev];
          newLessons[activeLesson] = { ...newLessons[activeLesson], ...lesson };
          return newLessons;
        });
      }
    );
  };

  const createLesson = async () => {
    const lesson = defaultLesson();
    await withFeedback(
      () => adminService.current.createLesson(id, lesson),
      (res) => {
        setLessons((prev) => [...prev, lesson]);
        if (activeLesson === null) {
          setActiveLesson(0);
        }
      }
    );
  };

  const deleteLesson = async () => {
    if (activeLesson === null) return;
    const lessonId = lessons[activeLesson].id;
    await withFeedback(
      () => adminService.current.deleteLesson(id, lessonId),
      (res) => {
        const newLessons = lessons.filter((l) => l.id !== lessonId);
        let newActiveLesson: number | null = activeLesson;
        if (newLessons.length === 0 || newActiveLesson === null) {
          newActiveLesson = null;
        } else if (newActiveLesson > 0) {
          newActiveLesson -= 1;
        } else if (newActiveLesson === 0) {
          newActiveLesson = 0;
        }
        setLessons(() => newLessons);
        setActiveLesson(() => newActiveLesson);
      }
    );
  };

  const createActivity = async () => {
    if (activeLesson === null) return;
    const activity = defaultActivity();
    const lessonId = lessons[activeLesson].id;
    withFeedback(
      () => adminService.current.createActivity(id, lessonId, activity),
      () => {
        setLessons((prev) => {
          return prev.map((l) => {
            if (l.id !== lessonId) return l;
            l.activities.push(activity);
            return l;
          });
        });
      }
    );
  };

  const deleteActivity = async (activityId: string) => {
    if (activeLesson === null) return;
    const lessonId = lessons[activeLesson].id;
    withFeedback(
      () => adminService.current.deleteActivity(id, lessonId, activityId),
      () => {
        setLessons((prev) => {
          const newLessons = [...prev] as any;
          newLessons[activeLesson].activities = newLessons[
            activeLesson
          ].activities.filter((a: any) => a.id !== activityId);
          return newLessons;
        });
      }
    );
  };

  return {
    stalling,
    snackbar,
    setSnackbar,
    // activity actions
    createActivity,
    deleteActivity,
    // lesson actions
    createLesson,
    saveLesson,
    deleteLesson,
    // theme actions
    saveTheme,
    deleteTheme,
  };
}
