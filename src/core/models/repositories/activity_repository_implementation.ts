import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ActivityRepository } from "./activity_repository";
import { Activity, LessonMap } from "../entities/learning_unit";
import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClientSingleton } from "@/core/utils/dynamo_db_client_singleton";
import { StatusResponse } from "./status_response";

export class ActivityRepositoryImplementation implements ActivityRepository {
  getActivity = async ({
    themeId,
    lessonId,
    activityId,
  }: {
    themeId: string;
    lessonId: string;
    activityId: string;
  }): Promise<StatusResponse> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new GetItemCommand({
      TableName: "themes",
      Key: {
        PK: { S: "theme" },
        SK: { S: themeId },
      },
      ProjectionExpression: "lessons",
    });

    try {
      const rawData = await dbClient.send(queryCommand);
      const data = unmarshall(rawData.Item!) as { lessons: LessonMap };
      const activity = data.lessons[lessonId].activities[activityId];
      return { status: "success", message: "", data: { activity } };
    } catch (error) {
      console.error("ActivityRepository -> getActivity: ", error);
      return { status: "error", message: "" };
    }
  };

  saveActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: Activity<any>
  ) => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: `SET #lessons.#lessonId.#activities.#activityIdKey = :activity`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#activityIdKey": activityId,
      },
      ExpressionAttributeValues: marshall({
        ":activity": activity,
      }),
    });

    const result = await dbClient.send(updateCommand);
  };

  deleteActivity = async ({
    themeId,
    lessonId,
    activityId,
    activityIndex,
  }: {
    themeId: string;
    lessonId: string;
    activityId: string;
    activityIndex: number;
  }): Promise<StatusResponse> => {
    const tableName = "themes";
    const key = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: `REMOVE #lessons.#lessonId.#activities.#activityId, #lessons.#lessonId.#activities.#idOrderMeta[${activityIndex}]`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#activityId": activityId,
        "#idOrderMeta": "idOrderMeta",
      },
    });

    try {
      await dbClient.send(updateCommand);
      return { status: "success", message: "Aktivite başarıyla silindi." };
    } catch (error) {
      console.error("ActivityRepository -> deleteActivity: ", error);
      return { status: "error", message: "Aktivite silme başarısız." };
    }
  };
}
