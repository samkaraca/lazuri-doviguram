import { UserExerciseLocalRepository } from "@/core/models/repositories/interfaces/user_exercise_loca_repository";

export class UserExerciseLocalRepositoryImplementation
  implements UserExerciseLocalRepository
{
  saveUserActivityDataLocally({
    activityId,
    exerciseData,
    grade,
  }: {
    activityId: string;
    exerciseData: any;
    grade: number;
  }) {
    const gradeText = Math.round(grade).toString();
    localStorage.setItem(
      activityId,
      JSON.stringify({ exerciseData, grade: gradeText })
    );
  }

  getLocalUserActivityData({
    activityId,
  }: {
    activityId: string;
  }): { exerciseData: any; grade: string } | null {
    const data = localStorage.getItem(activityId);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}
