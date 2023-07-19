import { Activity } from "@/core/models/entities/learning_unit";
import {
  FillInBlanksQuestion,
  MultipleChoiceQuestion,
  SimpleQuestion,
  TrueFalseQuestion,
} from "@/core/models/entities/question";
import { Dispatch, SetStateAction } from "react";

export interface OptionalStringValueProperty {
  value: string;
  status: "error" | "success" | "idle" | "loading";
}

export type OptionalYoutubeVideoUrl = OptionalStringValueProperty;
export type OptionalImage = OptionalStringValueProperty;
export type OptionalAudio = OptionalStringValueProperty;

export interface IViewModel {
  activityType: Activity<any>["activityType"];
  changeActivityType: (newActivityType: IViewModel["activityType"]) => void;
  title: string;
  setTitle: Dispatch<SetStateAction<IViewModel["title"]>>;
  explanation: string;
  setExplanation: Dispatch<SetStateAction<IViewModel["explanation"]>>;
  textContent: string;
  setTextContent: Dispatch<SetStateAction<IViewModel["textContent"]>>;
  image: OptionalImage;
  setImage: Dispatch<SetStateAction<IViewModel["image"]>>;
  audio: OptionalAudio;
  setAudio: Dispatch<SetStateAction<IViewModel["audio"]>>;
  youtubeVideoUrl: OptionalYoutubeVideoUrl;
  setYoutubeVideoUrl: Dispatch<SetStateAction<IViewModel["youtubeVideoUrl"]>>;
  fillInBlanksExercise: Map<string, FillInBlanksQuestion>;
  setFillInBlanksExercise: Dispatch<
    SetStateAction<IViewModel["fillInBlanksExercise"]>
  >;
  multipleChoiceExercise: Map<string, MultipleChoiceQuestion>;
  setMultipleChoiceExercise: Dispatch<
    SetStateAction<IViewModel["multipleChoiceExercise"]>
  >;
  trueFalseExercise: Map<string, TrueFalseQuestion>;
  setTrueFalseExercise: Dispatch<
    SetStateAction<IViewModel["trueFalseExercise"]>
  >;
  simpleExercise: Map<string, SimpleQuestion>;
  setSimpleExercise: Dispatch<SetStateAction<IViewModel["simpleExercise"]>>;
  saveActivity: () => Promise<void>;
}
