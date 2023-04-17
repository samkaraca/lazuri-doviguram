import {
  IExerciseItem,
  ITrueOrFalseExerciseItemContent,
} from "@/admin_panel/activity_editor/model/activity";

export type ExerciseModel = IExerciseItem<ITrueOrFalseExerciseItemContent>[];

export interface IViewModel {
  exercise: ExerciseModel;
}
