import ILocalExerciseRepository from "./local_exercise_repository";

export default function createLocalExerciseRepository(): ILocalExerciseRepository {
  return {
    save(activityId, localExercise) {
      localStorage.setItem(activityId, JSON.stringify(localExercise));
    },
    get(activityId) {
      const localExercise = localStorage.getItem(activityId);
      if (localExercise) {
        return JSON.parse(localExercise);
      }
    },
  };
}
