import IActivity from "@/lib/activity/activity";
import ILesson from "@/lib/lesson/lesson";
import ILocalExercise from "@/api/local_exercise_repository/local_exercise";
import { Dispatch, SetStateAction } from "react";

export interface ViewModel {
  // theme related
  id: string;
  title: string;
  explanation: string;
  image?: string | null;
  youtubeVideoUrl: string;
  lessons: ILesson[];
  createdAt: Date;
  // view related
  activeLesson: number | null;
  activeActivityId: string | null;
  activeActivity: IActivity | null;
  isActivityDialogOpen: boolean;
  localExerciseDatas: Map<string, ILocalExercise | null>;
  // setters
  setId: Dispatch<SetStateAction<ViewModel["id"]>>;
  setTitle: Dispatch<SetStateAction<ViewModel["title"]>>;
  setExplanation: Dispatch<SetStateAction<ViewModel["explanation"]>>;
  setImage: Dispatch<SetStateAction<ViewModel["image"]>>;
  setYoutubeVideoUrl: Dispatch<SetStateAction<ViewModel["youtubeVideoUrl"]>>;
  changeActiveLesson: (lesson: number | null) => void;
  setLessons: Dispatch<SetStateAction<ViewModel["lessons"]>>;
  openActivity: (activityId: string, activity: IActivity) => void;
  closeActivity: () => void;
}
