import { LocalExerciseDTO } from "./local_exercise_dto";

export class LocalExerciseRepository {
  saveExercise(activityId: string, localExercise: LocalExerciseDTO) {
    localStorage.setItem(activityId, JSON.stringify(localExercise));
  }

  getExercise(activityId: string): LocalExerciseDTO | null {
    const localExercise = localStorage.getItem(activityId);
    return localExercise ? JSON.parse(localExercise) : null;
  }
}
