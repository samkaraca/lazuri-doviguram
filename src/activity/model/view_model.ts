import { Dispatch, SetStateAction } from "react";

export type IActivityType =
  | "type-in-blanks"
  | "drag-into-blanks"
  | "true-or-false";

export type ITextAppendix = {
  header: string;
  content: string;
} | null;

export interface IExerciseItemContent {}

export interface IExerciseItem<T extends IExerciseItemContent> {
  id: string;
  content: T;
}

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

export interface ITrueOrFalseExerciseItemContent extends IExerciseItemContent {
  text: string;
  isTrue: boolean;
}

export interface IViewModel {
  activityType: IActivityType;
  explanation: string;
  textAppendix: ITextAppendix;
  typeOrDragExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[];
  trueOrFalseExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[];
  exerciseLocked: boolean;
  setExerciseLocked: Dispatch<SetStateAction<boolean>>;
}
