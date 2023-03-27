import { IExerciseItemContent } from "./activity";

export type TrueFalse = "true" | "false";

export const initialTrueFalse: TrueFalse = "true";

export type TrueFalseActivityType = "true-false";

export interface ITrueOrFalseExerciseItemContent extends IExerciseItemContent {
  text: string;
  isTrue: boolean;
}
