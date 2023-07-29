import { Activity } from "@/lib/activity/activity";
import { Lesson } from "@/lib/lesson/lesson";
import { Dispatch, SetStateAction } from "react";

export interface BaseViewModel {
  // theme related
  id: string;
  title: string;
  explanation: string;
  image: string;
  youtubeVideoUrl: string;
  lessons: Lesson[];
  createdAt: number;
  // view related
  activeLesson: number | null;
  activeActivityId: string | null;
  activeActivity: Activity | null;
  isActivityDialogOpen: boolean;
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
  openActivity: (activityId: string, activity: Activity) => void;
  closeActivity: () => void;
}
