import { Dispatch, SetStateAction } from "react";

export interface AdminViewModel {
  stalling: boolean;
  snackbar: {
    severity: "error" | "success" | "warning" | "info";
    message: string;
    visible: boolean;
  };
  setSnackbar: Dispatch<SetStateAction<AdminViewModel["snackbar"]>>;
  createNewLesson: () => Promise<void>;
  saveLesson: ({
    title,
    explanation,
  }: {
    title: string;
    explanation: string;
  }) => Promise<void>;
  deleteLesson: () => Promise<void>;
  createNewActivity: () => Promise<void>;
  deleteActivity: ({
    activityIndex,
    activityId,
  }: {
    activityIndex: number;
    activityId: string;
  }) => Promise<void>;
  saveTheme: ({
    title,
    explanation,
    image,
    youtubeVideoUrl,
  }: {
    title: string;
    explanation: string;
    image: string;
    youtubeVideoUrl: string;
  }) => Promise<void>;
  deleteTheme: () => Promise<void>;
  publishChanges: () => Promise<void>;
}
