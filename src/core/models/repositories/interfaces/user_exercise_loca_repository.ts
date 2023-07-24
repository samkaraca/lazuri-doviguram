export interface UserExerciseLocalRepository {
  saveUserActivityDataLocally({
    activityId,
    exerciseData,
    grade,
  }: {
    activityId: string;
    exerciseData: any;
    grade: number;
  }): void;

  getLocalUserActivityData({ activityId }: { activityId: string }): {
    exerciseData: any;
    grade: string;
  } | null;
}
