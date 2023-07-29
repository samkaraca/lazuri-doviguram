import { Lesson } from "@/lib/lesson/lesson";
import { Dispatch, SetStateAction } from "react";

export interface AdminViewModel {
  stalling: boolean;
  snackbar: {
    severity: "error" | "success" | "warning" | "info";
    message: string;
    visible: boolean;
  };
  setSnackbar: Dispatch<SetStateAction<AdminViewModel["snackbar"]>>;
  createLesson: () => Promise<void>;
  saveLesson: (lesson: Omit<Lesson, "activities">) => Promise<void>;
  deleteLesson: () => Promise<void>;
  createActivity: () => Promise<void>;
  deleteActivity: (activityId: string) => Promise<void>;
  saveTheme: (
    title: string,
    explanation: string,
    image: string,
    youtubeVideoUrl: string
  ) => Promise<void>;
  deleteTheme: () => Promise<void>;
}
