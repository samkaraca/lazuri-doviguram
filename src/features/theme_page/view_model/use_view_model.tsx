import { useEffect, useRef, useState } from "react";
import { ViewModel } from "../model/view_model";
import IActivity from "@/lib/activity/activity";
import ILesson from "@/lib/lesson/lesson";
import ITheme from "@/lib/theme/theme";
import createLocalExerciseRepository from "@/api/local_exercise_repository/local_exercise_repository_implementation";
import ILocalExercise from "@/api/local_exercise_repository/local_exercise";
import { useRouter } from "next/router";

export function useViewModel(theme: ITheme): ViewModel {
  const [id, setId] = useState(theme._id);
  const [title, setTitle] = useState(theme.title);
  const [explanation, setExplanation] = useState(theme.explanation);
  const [image, setImage] = useState(theme.image);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(theme.youtubeVideoUrl);
  const [lessons, setLessons] = useState<ILesson[]>(theme.lessons);
  const [localExerciseDatas, setLocalExerciseDatas] = useState<
    Map<string, ILocalExercise | null>
  >(new Map());
  const localExerciseRepo = useRef(createLocalExerciseRepository());

  // Update all states when theme changes
  useEffect(() => {
    setId(theme._id);
    setTitle(theme.title);
    setExplanation(theme.explanation);
    setImage(theme.image);
    setYoutubeVideoUrl(theme.youtubeVideoUrl);
    setLessons(theme.lessons);
  }, [theme]);

  // LESSON ROUTER STATE
  const router = useRouter();
  const lessonQueryParam = router.query["ders"];
  const activeLesson =
    typeof lessonQueryParam === "string" &&
      parseInt(lessonQueryParam) > 0 &&
      parseInt(lessonQueryParam) <= lessons.length
      ? parseInt(lessonQueryParam) - 1
      : lessons.length > 0
        ? 0
        : null;

  const changeActiveLesson = (lesson: number | null) => {
    const query = { ...router.query };

    if (lesson === null) {
      delete query["ders"];
    } else {
      query["ders"] = (lesson + 1).toString();
    }

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  // ACTIVITY ROUTER STATE
  const activityQueryParam = router.query["alistirma"];
  const activeActivityId =
    typeof activityQueryParam === "string" ? activityQueryParam : null;

  const changeActiveActivity = (activityId: string | null) => {
    const query = { ...router.query };

    if (activityId === null) {
      delete query["alistirma"];
    } else {
      query["ders"] = ((activeLesson as number) + 1).toString();
      query["alistirma"] = activityId;
    }

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    getLocalExerciseDatas();
  }, [theme, activeLesson]);

  // ACTIVITY DIALOG
  const [activeActivity, setActiveActivity] = useState<IActivity | null>(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  // on first render, if there is an active activity in the url, open it
  useEffect(() => {
    if (activeActivityId !== null && activeLesson !== null) {
      const activity = lessons[activeLesson].activities.find(
        (a) => a._id === activeActivityId
      );
      if (activity) {
        openActivity(activeActivityId, activity);
      }
    }
  }, [router.isReady]);

  const getLocalExerciseDatas = () => {
    if (activeLesson === null) return;
    const localExerciseDatasMap = new Map();
    lessons[activeLesson].activities.forEach((a) => {
      localExerciseDatasMap.set(a._id, localExerciseRepo.current.get(a._id));
    });
    setLocalExerciseDatas(localExerciseDatasMap);
  };

  const openActivity = (activityId: string, activity: IActivity) => {
    changeActiveActivity(activityId);
    setActiveActivity(activity);
    setIsActivityDialogOpen(true);
  };

  const closeActivity = () => {
    changeActiveActivity(null);
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
    changeActiveLesson,
    setId,
    setTitle,
    setExplanation,
    setImage,
    setYoutubeVideoUrl,
    setLessons,
    openActivity,
    closeActivity,
  };
}
