import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClientSingleton } from "../utils/dynamo_db_client_singleton";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Activity } from "./activity";
import { ActivityRepository } from "./activity_repository";
import { ApiResponse } from "../types/api_response";
import { DBActivity } from "../types/db_types/db_activity";

const dynamoDB = DynamoDBClientSingleton.getInstance();

export class DynamoDBActivityRepository implements ActivityRepository {
  createActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: DBActivity
  ): Promise<any> => {
    const activityToSave = { ...activity } as any;
    delete activityToSave.id;

    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      UpdateExpression: `SET #lessons.#lessonId.#activities.#idOrder = list_append(#lessons.#lessonId.#activities.#idOrder, :activityId), #lessons.#lessonId.#activities.#activityId = :activity`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#idOrder": "idOrder",
        "#activityId": activityId,
      },
      ExpressionAttributeValues: marshall({
        ":activityId": [activityId],
        ":activity": activityToSave,
      }),
    });

    return await dynamoDB.send(updateCommand);
  };

  saveActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: DBActivity
  ): Promise<any> => {
    const activityToSave = { ...activity } as any;
    delete activityToSave.id;

    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      UpdateExpression: `SET #lessons.#lessonId.#activities.#activityId = :activity`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#activityId": activityId,
      },
      ExpressionAttributeValues: marshall({
        ":activity": activityToSave,
      }),
    });

    return await dynamoDB.send(updateCommand);
  };

  deleteActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string
  ): Promise<any> => {
    const activityIndex = await this.getActivityOrder(
      themeId,
      lessonId,
      activityId
    );
    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      UpdateExpression: `REMOVE #lessons.#lessonId.#activities.#activityId, #lessons.#lessonId.#activities.#idOrder[${activityIndex}]`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#activityId": activityId,
        "#idOrder": "idOrder",
      },
    });

    return await dynamoDB.send(updateCommand);
  };

  getActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string
  ): Promise<DBActivity> => {
    const queryCommand = new GetItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      ProjectionExpression: "#lessons.#lessonId.#activities.#activityId",
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#activityId": activityId,
      },
    });

    const resItem = (await dynamoDB.send(queryCommand)).Item;
    if (!resItem) throw Error();
    return unmarshall(resItem)["lessons"][lessonId]["activities"][activityId];
  };

  private getActivityOrder = async (
    themeId: string,
    lessonId: string,
    activityId: string
  ): Promise<number> => {
    let activityIndex = -1;
    const getIdOrderCommand = new GetItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      ProjectionExpression: "#lessons.#lessonId.#activities.#idOrder",
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#idOrder": "idOrder",
      },
    });

    const resItem = (await dynamoDB.send(getIdOrderCommand)).Item;
    if (!resItem) throw Error();
    const idOrders =
      unmarshall(resItem)["lessons"][lessonId]["activities"]["idOrder"];
    activityIndex = idOrders.findIndex((id: string) => id === activityId);
    if (activityIndex === -1) {
      throw Error(`There is no such lesson with the id ${lessonId}`);
    }

    return activityIndex;
  };
}
