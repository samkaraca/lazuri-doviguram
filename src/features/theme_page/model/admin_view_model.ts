import ILesson from "@/lib/lesson/lesson";
import { Dispatch, SetStateAction } from "react";

export interface IAdminViewModel {
  stalling: boolean;
  snackbar: {
    severity: "error" | "success" | "warning" | "info";
    message: string;
    visible: boolean;
  };
  setSnackbar: Dispatch<SetStateAction<IAdminViewModel["snackbar"]>>;
  createLesson: () => Promise<void>;
  saveLesson: (lesson: Omit<ILesson, "activities">) => Promise<void>;
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
