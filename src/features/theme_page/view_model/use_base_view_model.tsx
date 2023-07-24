import { useState } from "react";
import { Activity, Theme } from "@/core/models/entities/learning_unit";
import { BaseViewModel } from "../model/base_view_model";

export function useBaseViewModel(theme: Theme): BaseViewModel {
  const [pathName, setPathName] = useState(theme.pathName);
  const [themeTitle, setThemeTitle] = useState(theme.title);
  const [themeExplanation, setThemeExplanation] = useState(theme.explanation);
  const [themeImage, setThemeImage] = useState(theme.image);
  const [themeYoutubeVideoUrl, setThemeYoutubeVideoUrl] = useState(
    theme.youtubeVideoUrl
  );
  const [lessons, setLessons] = useState(theme.lessons);
  const [activeLesson, setActiveLesson] = useState<number | null>(
    theme.lessons.meta.length > 0 ? 0 : null
  );

  // ACTIVITY DIALOG
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity<any> | null>(
    null
  );
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  const openActivity = (activityId: string, activity: Activity<any>) => {
    setActiveActivityId(activityId);
    setActiveActivity(activity);
    setIsActivityDialogOpen(true);
  };

  const closeActivity = () => {
    setActiveActivityId(null);
    setActiveActivity(null);
    setIsActivityDialogOpen(false);
  };

  return {
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
    pathName,
    activeActivityId,
    setPathName,
  };
}
