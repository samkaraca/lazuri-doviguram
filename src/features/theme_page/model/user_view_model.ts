import { Lesson, LessonMap } from "@/core/models/entities/learning_unit";
import { Dispatch, SetStateAction } from "react";

export interface UserViewModel {
  isAdmin: boolean;
  themeTitle: string;
  themeExplanation: string;
  themeImage: string;
  lessons: LessonMap;
  themeYoutubeVideoUrl: string;
  activeLesson: number;
  setActiveLesson: Dispatch<SetStateAction<UserViewModel["activeLesson"]>>;
}
