import { DBActivity } from "../../types/db_activity";

export default interface IActivityRepository {
  createActivity: (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: DBActivity
  ) => Promise<any>;
  saveActivity: (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: DBActivity
  ) => Promise<any>;
  deleteActivity: (
    themeId: string,
    lessonId: string,
    activityId: string
  ) => Promise<any>;
  getActivity: (
    themeId: string,
    lessonId: string,
    activityId: string
  ) => Promise<DBActivity>;
}
