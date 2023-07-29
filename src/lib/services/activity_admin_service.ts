import { Activity } from "../activity/activity";
import ActivityApiService from "./activity_api_service";

export default class ActivityAdminService {
  async fetchActivity(themeId: string, lessonId: string, activityId: string) {
    const resObj = await fetch(
      `/api/admin/temalar/${themeId}/${lessonId}/${activityId}`
    );
    const res = await (resObj.json() as ReturnType<
      ActivityApiService["getActivity"]
    >);
    if (res.status === "success" && res.data) {
      return Activity.from(res.data);
    }
    return undefined;
  }
}
