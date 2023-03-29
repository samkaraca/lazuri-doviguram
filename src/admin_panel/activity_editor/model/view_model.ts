import { Dispatch, SetStateAction } from "react";
import {
  ActivityType,
  IExerciseItem,
  ITextAppendix,
} from "./activity/activity";
import {
  ITrueOrFalseExerciseItemContent,
  ITypeOrDragExerciseItemContent,
} from "./activity";

export interface IViewModel {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  textAppendix: ITextAppendix | null;
  setTextAppendix: Dispatch<SetStateAction<ITextAppendix | null>>;
  explanation: string;
  setExplanation: Dispatch<SetStateAction<string>>;
  typeOrDragExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[];
  dispatchTypeOrDragExercise: Dispatch<{
    type: "change" | "add" | "remove" | "reset";
    id: string;
    text: string;
  }>;
  trueOrFalseExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[];
  dispatchTrueOrFalseExercise: Dispatch<{
    type: "add" | "remove" | "reset" | "changeText" | "changeIsTrue";
    isTrue: boolean;
    text: string;
    id: string;
  }>;
  save: () => void;
}
