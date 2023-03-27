import { IExerciseItemContent } from "./activity";

export type FillOrDragActivityType = "type-in-blanks" | "drag-into-blanks";

export interface IFillOrDragExerciseItemContent extends IExerciseItemContent {
  text: string;
}
