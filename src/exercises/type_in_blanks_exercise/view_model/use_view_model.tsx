import { ExerciseModel, IViewModel } from "../model/view_model";

export function useViewModel(exercise: ExerciseModel): IViewModel {
  return {
    exercise,
  };
}
