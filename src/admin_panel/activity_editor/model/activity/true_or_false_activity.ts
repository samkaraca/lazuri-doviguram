import { IExerciseItemContent } from "./activity";

export type ITrueOrFalse = "true" | "false";

export const initialTrueOrFalse: ITrueOrFalse = "true";

export type ITrueOrFalseActivityType = "true-or-false";

export interface ITrueOrFalseExerciseItemContent extends IExerciseItemContent {
  text: string;
  isTrue: boolean;
}
