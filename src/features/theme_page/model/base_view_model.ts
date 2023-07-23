import { Activity, LessonMap } from "@/core/models/entities/learning_unit";
import { Dispatch, SetStateAction } from "react";

export interface BaseViewModel {
  pathName: string;
  setPathName: Dispatch<SetStateAction<BaseViewModel["pathName"]>>;
  themeId: string;
  themeTitle: string;
  setThemeTitle: Dispatch<SetStateAction<BaseViewModel["themeTitle"]>>;
  themeExplanation: string;
  setThemeExplanation: Dispatch<
    SetStateAction<BaseViewModel["themeExplanation"]>
  >;
  themeImage: string;
  setThemeImage: Dispatch<SetStateAction<BaseViewModel["themeImage"]>>;
  lessons: LessonMap;
  setLessons: Dispatch<SetStateAction<BaseViewModel["lessons"]>>;
  themeYoutubeVideoUrl: string;
  setThemeYoutubeVideoUrl: Dispatch<
    SetStateAction<BaseViewModel["themeYoutubeVideoUrl"]>
  >;
  activeLesson: number | null;
  setActiveLesson: Dispatch<SetStateAction<BaseViewModel["activeLesson"]>>;
  isActivityDialogOpen: boolean;
  openActivity: (activity: Activity<any>) => void;
  closeActivity: () => void;
  activeActivity: Activity<any> | null;
}
