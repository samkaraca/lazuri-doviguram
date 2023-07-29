import { LocalExerciseRepository } from "./local_exercise_repository";

export abstract class Exercise<QuestionType> {
  constructor(
    readonly activityId: string,
    readonly questions: QuestionType[]
  ) {}

  abstract get grade(): number;

  saveLocally(activityId: string, exerciseService: LocalExerciseRepository) {
    exerciseService.saveExercise(activityId, {
      exercise: this,
      grade: this.grade,
    });
  }

  protected abstract createFrom(
    exercise: Exercise<QuestionType>
  ): Exercise<QuestionType>;

  getLocalVersion(exerciseService: LocalExerciseRepository) {
    const localData = exerciseService.getExercise(this.activityId);

    if (localData) {
      return this.createFrom(localData.exercise as Exercise<any>);
    }

    return null;
  }
}
