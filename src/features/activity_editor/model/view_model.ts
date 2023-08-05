import IActivity from "@/lib/activity/activity";
import IExercise from "@/lib/exercise/exercise";
import { Dispatch, SetStateAction } from "react";

export interface OptionalStringValueProperty {
  value: string;
  status: "error" | "success" | "idle" | "loading";
}

export type OptionalYoutubeVideoUrl = OptionalStringValueProperty;
export type OptionalImage = OptionalStringValueProperty;
export type OptionalAudio = OptionalStringValueProperty;

export interface IViewModel {
  id: string;
  savedAt: number;
  type: IActivity["type"];
  title: string;
  explanation: string;
  textContent: string;
  audio: OptionalAudio;
  image: OptionalImage;
  youtubeVideoUrl: OptionalYoutubeVideoUrl;
  setTitle: Dispatch<SetStateAction<IViewModel["title"]>>;
  changeActivityType: (newActivityType: IViewModel["type"]) => void;
  setExplanation: Dispatch<SetStateAction<IViewModel["explanation"]>>;
  setTextContent: Dispatch<SetStateAction<IViewModel["textContent"]>>;
  setImage: Dispatch<SetStateAction<IViewModel["image"]>>;
  setAudio: Dispatch<SetStateAction<IViewModel["audio"]>>;
  setYoutubeVideoUrl: Dispatch<SetStateAction<IViewModel["youtubeVideoUrl"]>>;
  exercise: IExercise;
  setExercise: Dispatch<SetStateAction<IViewModel["exercise"]>>;
  saveActivity: () => Promise<void>;
}
