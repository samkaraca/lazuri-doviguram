import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { Activity } from "../entities/learning_unit";
import { StatusResponse } from "./status_response";

export interface ActivityRepository {
  saveActivity: (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: Activity<any>
  ) => Promise<void>;
  getActivity: (themeId: string) => Promise<Record<string, AttributeValue>>;
  deleteActivity: ({
    themeId,
    lessonId,
    activityId,
    activityIndex,
  }: {
    themeId: string;
    lessonId: string;
    activityId: string;
    activityIndex: number;
  }) => Promise<StatusResponse>;
}
