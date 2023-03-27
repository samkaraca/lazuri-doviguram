import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { ActivityType, ExerciseItem, ITextAppendix } from "./activity/activity";

export interface IViewModel {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  textAppendix: ITextAppendix | null;
  setTextAppendix: Dispatch<SetStateAction<ITextAppendix | null>>;
  explanation: string;
  setExplanation: Dispatch<SetStateAction<string>>;
  exercise: ExerciseItem[];
  setExercise: Dispatch<SetStateAction<ExerciseItem[]>>;
  save: () => void;
}
