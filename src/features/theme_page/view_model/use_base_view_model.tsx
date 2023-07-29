import { useState } from "react";
import { BaseViewModel } from "../model/base_view_model";
import { Theme } from "@/lib/theme/theme";
import { Activity } from "@/lib/activity/activity";
import { Lesson } from "@/lib/lesson/lesson";

export function useBaseViewModel(theme: Theme): BaseViewModel {
  const [id, setId] = useState(theme.id);
  const [title, setTitle] = useState(theme.title);
  const [explanation, setExplanation] = useState(theme.explanation);
  const [image, setImage] = useState(theme.image);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(theme.youtubeVideoUrl);
  const [lessons, setLessons] = useState<Lesson[]>(theme.lessons);
  const [activeLesson, setActiveLesson] = useState<number | null>(
    theme.lessons.length > 0 ? 0 : null
  );

  // ACTIVITY DIALOG
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  const openActivity = (activityId: string, activity: Activity) => {
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
    // theme related
    id,
    title,
    explanation,
    image,
    youtubeVideoUrl,
    lessons,
    createdAt: theme.createdAt,
    // view related
    activeLesson,
    isActivityDialogOpen,
    activeActivity,
    activeActivityId,
    // setters
    setId,
    setTitle,
    setExplanation,
    setImage,
    setYoutubeVideoUrl,
    setLessons,
    setActiveLesson,
    openActivity,
    closeActivity,
  };
}
