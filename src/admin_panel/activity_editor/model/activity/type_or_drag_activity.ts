import { IExerciseItemContent } from "./activity";

export type TypeOrDragActivityType = "type-in-blanks" | "drag-into-blanks";

export interface IExerciseItemTextPiece {
  type: "text";
  text: string;
}

export interface IExerciseItemTextInputPiece {
  type: "text-input";
  correctAnswer: string;
}

export interface ITypeOrDragExerciseItemContent extends IExerciseItemContent {
  processedContent: (IExerciseItemTextPiece | IExerciseItemTextInputPiece)[];
  rawContent: string;
}
