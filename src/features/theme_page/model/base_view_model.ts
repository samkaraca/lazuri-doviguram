import IActivity from "@/lib/activity/activity";
import ILesson from "@/lib/lesson/lesson";
import ILocalExercise from "@/lib/repositories/local_exercise_repository/local_exercise";
import { Dispatch, SetStateAction } from "react";

export interface BaseViewModel {
  // theme related
  id: string;
  title: string;
  explanation: string;
  image: string;
  youtubeVideoUrl: string;
  lessons: ILesson[];
  createdAt: number;
  // view related
  activeLesson: number | null;
  activeActivityId: string | null;
  activeActivity: IActivity | null;
  isActivityDialogOpen: boolean;
  localExerciseDatas: Map<string, ILocalExercise | null>;
  // setters
  setId: Dispatch<SetStateAction<BaseViewModel["id"]>>;
  setTitle: Dispatch<SetStateAction<BaseViewModel["title"]>>;
  setExplanation: Dispatch<SetStateAction<BaseViewModel["explanation"]>>;
  setImage: Dispatch<SetStateAction<BaseViewModel["image"]>>;
  setYoutubeVideoUrl: Dispatch<
    SetStateAction<BaseViewModel["youtubeVideoUrl"]>
  >;
  setLessons: Dispatch<SetStateAction<BaseViewModel["lessons"]>>;
  setActiveLesson: Dispatch<SetStateAction<BaseViewModel["activeLesson"]>>;
  openActivity: (activityId: string, activity: IActivity) => void;
  closeActivity: () => void;
}
