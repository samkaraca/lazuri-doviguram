import {
  IExerciseItem,
  ITypeOrDragExerciseItemContent,
} from "@/admin_panel/activity_editor/model/activity";

export type ExerciseModel = IExerciseItem<ITypeOrDragExerciseItemContent>[];

export interface IViewModel {
  exercise: ExerciseModel;
}
