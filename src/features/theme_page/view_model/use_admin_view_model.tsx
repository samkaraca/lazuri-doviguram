import { LessonMap } from "@/core/models/entities/learning_unit";
import { useBaseViewModelContext } from "./context_providers/base_view_model";
import { useRef } from "react";
import { AdminViewModel } from "../model/admin_view_model";
import { useAdminThemeDialog } from "./use_admin_theme_dialog";
import { ThemeRepository as TR } from "@/core/models/repositories/theme_repository";
import { ThemeRepository } from "../model/repositories/theme_repository";

export function useAdminViewModel(): AdminViewModel {
  const {
    isAdmin,
    themeId,
    activeLesson,
    lessons,
    themeTitle,
    setThemeTitle,
    themeExplanation,
    setThemeExplanation,
    themeYoutubeVideoUrl,
    setThemeYoutubeVideoUrl,
    setLessons,
    setActiveLesson,
    themeImage,
    setThemeImage,
  } = useBaseViewModelContext()!;
  const themeRepo = useRef<ThemeRepository>(new ThemeRepository(themeId));

  const saveThemeTitle = async (newTitle: string) => {
    await themeRepo.current.updateThemeWith({
      data: { type: "setThemeTitle", newTitle },
    });
    setThemeTitle(newTitle);
  };

  const saveThemeExplanation = async (newExplanation: string) => {
    await themeRepo.current.updateThemeWith({
      data: { type: "setThemeExplanation", newExplanation },
    });
    setThemeExplanation(newExplanation);
  };

  const saveThemeImage = async (newImage: string) => {
    await themeRepo.current.updateThemeWith({
      data: { type: "setThemeImage", newImage },
    });
    setThemeImage(newImage);
  };

  const saveThemeYoutubeVideoUrl = async (newUrl: string) => {
    await themeRepo.current.updateThemeWith({
      data: { type: "setThemeYoutubeVideoUrl", newUrl },
    });
    setThemeYoutubeVideoUrl(newUrl);
  };

  const saveLessonTitle = async (newTitle: string) => {
    await themeRepo.current.updateThemeWith({
      data: { type: "setLessonTitle", newTitle },
      lessonId: activeLesson.toString(),
    });
    setLessons((prevLessons) => {
      const newMeta = [...prevLessons.meta];
      newMeta[activeLesson].title = newTitle;

      return {
        ...prevLessons,
        meta: newMeta,
      } as LessonMap;
    });
  };

  const saveLessonExplanation = async (newExplanation: string) => {
    const lessonId = lessons.meta[activeLesson].id;
    await themeRepo.current.updateThemeWith({
      data: { type: "setLessonExplanation", newExplanation },
      lessonId,
    });

    setLessons((prevLessons) => {
      const newLesson = { ...prevLessons };
      newLesson[lessonId].explanation = newExplanation;
      return newLesson;
    });
  };

  const createNewLesson = async () => {
    const newLessons = await themeRepo.current.updateThemeWith({
      data: { type: "createNewLesson" },
    });

    setLessons((prevLessons) => ({ ...prevLessons, ...newLessons.lessons }));
  };

  const deleteLesson = async (lessonId: string) => {
    const updatedLessons = await themeRepo.current.updateThemeWith({
      data: { type: "deleteLesson", lessonId },
    });

    setLessons((prevLessons) => {
      const newLessons = { ...prevLessons };

      delete newLessons[lessonId];
      newLessons.meta = newLessons.meta.filter(
        (lessonMeta) => lessonMeta.id !== lessonId
      );

      return newLessons;
    });

    setActiveLesson((prev) => (prev === 0 ? prev : prev - 1));
  };

  const createNewActivity = async (lessonId: string) => {
    const res = await fetch(`/api/admin/temalar/${themeId}/${lessonId}`, {
      method: "PUT",
      body: JSON.stringify({
        type: "createNewActivity",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newActivity = await (res.json() as ReturnType<
      TR["createNewActivity"]
    >);

    setLessons((prev) => {
      const newLessons = { ...prev };
      let newActivities = { ...prev[lessonId].activities };
      newActivities.idOrderMeta = [
        ...newActivities.idOrderMeta,
        newActivity.meta,
      ];
      newActivities = {
        ...newActivities,
        [newActivity.meta]: newActivity.activity,
      };
      newLessons[lessonId].activities = newActivities;

      return newLessons;
    });
  };

  const adminThemeDialog = useAdminThemeDialog({
    themeTitle,
    saveThemeTitle,
    themeExplanation,
    saveThemeExplanation,
    themeYoutubeVideoUrl,
    saveThemeYoutubeVideoUrl,
    themeImage,
    saveThemeImage,
    saveLessonTitle,
    saveLessonExplanation,
    lessons,
  });

  return {
    isAdmin,
    saveThemeTitle,
    saveThemeExplanation,
    saveThemeImage,
    saveThemeYoutubeVideoUrl,
    saveLessonTitle,
    saveLessonExplanation,
    createNewLesson,
    createNewActivity,
    deleteLesson,
    adminThemeDialog,
  };
}
