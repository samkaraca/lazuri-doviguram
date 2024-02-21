import IActivity from "@/lib/activity/activity";
import IActivityRepository from "@/backend/repositories/activity/activity_repository";
import { ApiResponse } from "@/api/api_response";

export default class ActivityBackendService {
  constructor(private readonly activityRepo: IActivityRepository) {}

  async createActivity(themeId: string, lessonId: string, activity: IActivity) {
    try {
      const activityToCreate = { ...activity } as any;
      delete activityToCreate.id;
      await this.activityRepo.createActivity(
        themeId,
        lessonId,
        activity.id,
        activityToCreate
      );
      return {
        status: "success",
        message: "Aktivite başarıyla oluşturuldu.",
      };
    } catch (error) {
      console.error("ActivityApiService -> createActivity: ", error);
      return { status: "error", message: "Aktivite oluşturma başarısız." };
    }
  }

  async saveActivity(themeId: string, lessonId: string, activity: IActivity) {
    try {
      const activityToSave = { ...activity } as any;
      delete activityToSave.id;
      await this.activityRepo.saveActivity(
        themeId,
        lessonId,
        activity.id,
        activityToSave
      );
      return { status: "success", message: "Aktivite başarıyla kaydedildi." };
    } catch (error) {
      console.error("ActivityApiService -> saveActivity: ", error);
      return { status: "error", message: "Aktivite kaydetme başarısız." };
    }
  }

  async deleteActivity(themeId: string, lessonId: string, activityId: string) {
    try {
      await this.activityRepo.deleteActivity(themeId, lessonId, activityId);
      return { status: "success", message: "Aktivite başarıyla silindi." };
    } catch (error) {
      console.error("ActivityApiService -> deleteActivity: ", error);
      return { status: "error", message: "Aktivite silme başarısız." };
    }
  }

  async getActivity(
    themeId: string,
    lessonId: string,
    activityId: string
  ): Promise<ApiResponse<IActivity>> {
    try {
      const activity = await this.activityRepo.getActivity(
        themeId,
        lessonId,
        activityId
      );
      return {
        status: "success",
        message: "",
        data: { ...activity, id: activityId },
      };
    } catch (error) {
      console.error("ActivityApiService -> getActivity: ", error);
      return { status: "error", message: "" };
    }
  }
}
