import { useState } from "react";
import { Activity, Theme } from "@/core/models/entities/learning_unit";
import { BaseViewModel } from "../model/base_view_model";

export function useBaseViewModel(
  theme: Theme,
  isAdmin: boolean
): BaseViewModel {
  const [themeTitle, setThemeTitle] = useState(theme.title);
  const [themeExplanation, setThemeExplanation] = useState(theme.explanation);
  const [themeImage, setThemeImage] = useState(theme.image);
  const [themeYoutubeVideoUrl, setThemeYoutubeVideoUrl] = useState(
    theme.youtubeVideoUrl
  );
  const [lessons, setLessons] = useState(theme.lessons);
  const [activeLesson, setActiveLesson] = useState(0);

  // ACTIVITY DIALOG
  const [activeActivity, setActiveActivity] = useState<Activity<any> | null>(
    null
  );
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  const openActivity = (activity: Activity<any>) => {
    setActiveActivity(activity);
    setIsActivityDialogOpen(true);
  };

  const closeActivity = () => {
    setActiveActivity(null);
    setIsActivityDialogOpen(false);
  };

  return {
    isAdmin,
    themeId: theme.id,
    themeTitle,
    themeExplanation,
    themeImage,
    lessons,
    themeYoutubeVideoUrl,
    activeLesson,
    setThemeTitle,
    setThemeExplanation,
    setThemeImage,
    setThemeYoutubeVideoUrl,
    setLessons,
    setActiveLesson,
    isActivityDialogOpen,
    openActivity,
    closeActivity,
    activeActivity,
  };
}
