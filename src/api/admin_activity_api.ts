import IActivity from "../lib/activity/activity";
import { BackendActivityService } from "../backend/services/activity_service";
import { ApiResponse } from "./api_response";

export class AdminActivityApi {
  async fetchActivity(
    themeId: string,
    lessonId: string,
    activityId: string
  ): Promise<IActivity | undefined> {
    const resObj = await fetch(
      `/api/admin/themes/${themeId}/lessons/${lessonId}/activities/${activityId}`
    );
    const res = await (resObj.json() as ReturnType<
      BackendActivityService["getActivity"]
    >);
    if (res.status === "success" && res.data) {
      return res.data;
    }
    return undefined;
  }

  async saveActivity(themeId: string, lessonId: string, activity: IActivity) {
    const resObj = await fetch(
      `/api/admin/themes/${themeId}/lessons/${lessonId}/activities/${activity.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          activity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await (resObj.json() as ReturnType<
      BackendActivityService["saveActivity"]
    >);
  }

  deleteActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string
  ) => {
    const resObj = await fetch(
      `/api/admin/themes/${themeId}/lessons/${lessonId}/activities/${activityId}`,
      {
        method: "DELETE",
      }
    );
    return (await resObj.json()) as ApiResponse;
  };

  createActivity = async (
    themeId: string,
    lessonId: string,
    activity: IActivity
  ) => {
    const resObj = await fetch(
      `/api/admin/themes/${themeId}/lessons/${lessonId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity,
        }),
      }
    );
    return (await resObj.json()) as ApiResponse;
  };
}
