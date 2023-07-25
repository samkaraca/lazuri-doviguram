import { UserExerciseLocalRepository } from "../../repositories/interfaces/user_exercise_loca_repository";

export abstract class Exercise<Q> {
  constructor(readonly activityId: string, readonly questions: Q[]) {}

  abstract get grade(): number;

  saveLocally(userExerciseLocalRepo: UserExerciseLocalRepository) {
    userExerciseLocalRepo.saveUserActivityDataLocally({
      activityId: this.activityId,
      grade: this.grade,
      exerciseData: this,
    });
  }

  protected abstract createFrom(
    activityId: string,
    questions: Q[]
  ): Exercise<Q>;

  getLocalVersion(userExerciseLocalRepo: UserExerciseLocalRepository) {
    const localData = userExerciseLocalRepo.getLocalUserActivityData({
      activityId: this.activityId,
    });

    if (localData) {
      return this.createFrom(this.activityId, localData.exerciseData);
    }

    return null;
  }
}
