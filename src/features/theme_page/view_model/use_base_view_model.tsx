import { useEffect, useRef, useState } from "react";
import { BaseViewModel } from "../model/base_view_model";
import IActivity from "@/lib/activity/activity";
import ILesson from "@/lib/lesson/lesson";
import ITheme from "@/lib/theme/theme";
import createLocalExerciseRepository from "@/api/local_exercise_repository/local_exercise_repository_implementation";
import ILocalExercise from "@/api/local_exercise_repository/local_exercise";

export function useBaseViewModel(theme: ITheme): BaseViewModel {
  const [id, setId] = useState(theme.id);
  const [title, setTitle] = useState(theme.title);
  const [explanation, setExplanation] = useState(theme.explanation);
  const [image, setImage] = useState(theme.image);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(theme.youtubeVideoUrl);
  const [lessons, setLessons] = useState<ILesson[]>(theme.lessons);
  const [activeLesson, setActiveLesson] = useState<number | null>(
    theme.lessons.length > 0 ? 0 : null
  );
  const [localExerciseDatas, setLocalExerciseDatas] = useState<
    Map<string, ILocalExercise | null>
  >(new Map());
  const localExerciseRepo = useRef(createLocalExerciseRepository());

  useEffect(() => {
    getLocalExerciseDatas();
  }, [theme, activeLesson]);

  // ACTIVITY DIALOG
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<IActivity | null>(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  const getLocalExerciseDatas = () => {
    if (activeLesson === null) return;
    const localExerciseDatasMap = new Map();
    lessons[activeLesson].activities.forEach((a) => {
      localExerciseDatasMap.set(a.id, localExerciseRepo.current.get(a.id));
    });
    setLocalExerciseDatas(localExerciseDatasMap);
  };

  const openActivity = (activityId: string, activity: IActivity) => {
    setActiveActivityId(activityId);
    setActiveActivity(activity);
    setIsActivityDialogOpen(true);
  };

  const closeActivity = () => {
    setActiveActivityId(null);
    setActiveActivity(null);
    setIsActivityDialogOpen(false);
    getLocalExerciseDatas();
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
    localExerciseDatas,
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
