import { TypeOrDragActivityType } from "./type_or_drag_activity";
import { ITrueOrFalseActivityType } from "./true_or_false_activity";
import { IDragAndPairWithImagesActivityType } from "./drag_and_pair_with_images";

export const initialActivityType: ActivityType = "type-in-blanks";

export type ActivityType =
  | TypeOrDragActivityType
  | ITrueOrFalseActivityType
  | IDragAndPairWithImagesActivityType;

export interface IExerciseItem<T extends IExerciseItemContent> {
  id: string;
  content: T;
}

export interface IExerciseItemContent {}

export const activityTypes: { type: ActivityType; label: string }[] = [
  { type: "type-in-blanks", label: "Boşluk doldurma" },
  { type: "drag-into-blanks", label: "Boşluğa sürükleme" },
  {
    type: "drag-and-pair-with-images",
    label: "Resimli sürükleyerek eşleştirme",
  },
  { type: "true-or-false", label: "Doğru Yanlış" },
];

export interface ITextAppendix {
  header: string;
  content: string;
}

export interface IActivity {
  type: ActivityType;
  code: string;
  explanation: string;
  textAppendix: ITextAppendix | null;
  exercise: IExerciseItem<IExerciseItemContent>[];
}
