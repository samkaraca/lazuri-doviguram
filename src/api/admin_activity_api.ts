import IActivity from "../lib/activity/activity";
import ActivityApiService from "../backend/services/activity_service";

export class AdminActivityApi {
  async fetchActivity(
    themeId: string,
    lessonId: string,
    activityId: string
  ): Promise<IActivity | undefined> {
    const resObj = await fetch(
      `/api/admin/temalar/${themeId}/${lessonId}/${activityId}`
    );
    const res = await (resObj.json() as ReturnType<
      ActivityApiService["getActivity"]
    >);
    if (res.status === "success" && res.data) {
      return res.data;
    }
    return undefined;
  }

  async saveActivity(themeId: string, lessonId: string, activity: IActivity) {
    const resObj = await fetch(`/api/admin/temalar/${themeId}/${lessonId}`, {
      method: "PUT",
      body: JSON.stringify({
        type: "saveActivity",
        activity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await (resObj.json() as ReturnType<
      ActivityApiService["saveActivity"]
    >);
  }
}
