import { Dispatch, SetStateAction } from "react";
import {
  ActivityType,
  IExerciseItem,
  ITextAppendix,
} from "./activity/activity";

export interface IViewModel {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  textAppendix: ITextAppendix | null;
  setTextAppendix: Dispatch<SetStateAction<ITextAppendix | null>>;
  explanation: string;
  setExplanation: Dispatch<SetStateAction<string>>;
  exercise: IExerciseItem[];
  setExercise: Dispatch<SetStateAction<IExerciseItem[]>>;
  save: () => void;
}
