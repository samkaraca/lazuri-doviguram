import ILocalExercise from "./local_exercise";

export default interface ILocalExerciseRepository {
  save: (activityId: string, localExercise: ILocalExercise) => void;
  get: (activityId: string) => ILocalExercise | null;
}
