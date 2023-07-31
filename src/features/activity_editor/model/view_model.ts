import { Activity } from "@/lib/activity/activity";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";
import { MultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";
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
  type: Activity["type"];
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
  fillInBlanksExercise: FillInBlanksExercise;
  setFillInBlanksExercise: Dispatch<
    SetStateAction<IViewModel["fillInBlanksExercise"]>
  >;
  multipleChoiceExercise: MultipleChoiceExercise;
  setMultipleChoiceExercise: Dispatch<
    SetStateAction<IViewModel["multipleChoiceExercise"]>
  >;
  simpleExercise: SimpleExercise;
  setSimpleExercise: Dispatch<SetStateAction<IViewModel["simpleExercise"]>>;
  saveActivity: () => Promise<void>;
}
