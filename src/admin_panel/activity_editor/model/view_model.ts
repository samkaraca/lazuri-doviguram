import { Dispatch, SetStateAction } from "react";
import {
  ActivityType,
  IExerciseItem,
  IExerciseItemContent,
  ITextAppendix,
} from "./activity/activity";

export interface IViewModel {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  textAppendix: ITextAppendix | null;
  setTextAppendix: Dispatch<SetStateAction<ITextAppendix | null>>;
  explanation: string;
  setExplanation: Dispatch<SetStateAction<string>>;
  exercise: IExerciseItem<IExerciseItemContent>[];
  setExercise: Dispatch<SetStateAction<IExerciseItem<IExerciseItemContent>[]>>;
  save: () => void;
}
