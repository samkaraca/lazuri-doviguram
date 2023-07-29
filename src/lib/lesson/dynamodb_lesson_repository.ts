import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBClientSingleton } from "../utils/dynamo_db_client_singleton";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Lesson } from "./lesson";
import { LessonRepository } from "./lesson_repository";
import { ApiResponse } from "../types/api_response";
import { DBLesson } from "../types/db_types/db_lesson";

const dynamoDB = DynamoDBClientSingleton.getInstance();

export class DynamoDBLessonRepository implements LessonRepository {
  createLesson = async (
    themeId: string,
    lessonId: string,
    lesson: DBLesson
  ) => {
    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      UpdateExpression: `SET #lessons.#idOrder = list_append(#lessons.#idOrder, :lessonId), #lessons.#lessonId = :lesson`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#idOrder": "idOrder",
      },
      ExpressionAttributeValues: marshall({
        ":lessonId": [lessonId],
        ":lesson": lesson,
      }),
    });

    return await dynamoDB.send(updateCommand);
  };

  saveLesson = async (
    themeId: string,
    lessonId: string,
    lesson: Omit<DBLesson, "activities">
  ): Promise<any> => {
    const command = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      UpdateExpression: `SET #lessons.#lessonId.#title = :title, #lessons.#lessonId.#explanation = :explanation`,
      ConditionExpression:
        "contains(#lessons.#idOrder, :lessonId) and attribute_exists(#lessons.#lessonId)",
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#title": "title",
        "#explanation": "explanation",
        "#idOrder": "idOrder",
      },
      ExpressionAttributeValues: marshall({
        ":lessonId": lessonId,
        ":title": lesson.title,
        ":explanation": lesson.explanation,
      }),
    });

    return await dynamoDB.send(command);
  };

  deleteLesson = async (themeId: string, lessonId: string): Promise<any> => {
    const lessonIndex = await this.getLessonOrder(themeId, lessonId);
    const deleteLessonCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      UpdateExpression: `REMOVE #lessons.#lessonId, #lessons.#idOrder[${lessonIndex}]`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#idOrder": "idOrder",
      },
    });
    return await dynamoDB.send(deleteLessonCommand);
  };

  private getLessonOrder = async (
    themeId: string,
    lessonId: string
  ): Promise<number> => {
    let lessonIndex = -1;
    const getIdOrderCommand = new GetItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
      ProjectionExpression: "lessons.idOrder",
    });

    const res = (await dynamoDB.send(getIdOrderCommand)).Item;
    if (!res) throw Error("Item is undefined");

    lessonIndex = unmarshall(res).lessons.idOrder.findIndex(
      (id: string) => id === lessonId
    );
    if (lessonIndex === -1) {
      throw Error(`There is no such lesson with the id ${lessonId}`);
    }

    return lessonIndex;
  };
}
