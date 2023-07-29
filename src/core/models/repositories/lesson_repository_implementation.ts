import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { LessonRepository } from "./lesson_repository";
import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClientSingleton } from "@/lib/utils/dynamo_db_client_singleton";
import { nanoid } from "nanoid";
import { Activity } from "../entities/learning_unit";
import { StatusResponse } from "./status_response";

export class LessonRepositoryImplementation implements LessonRepository {
  createNewActivity = async (
    themeId: string,
    lessonId: string
  ): Promise<StatusResponse> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });
    const newActivityIdKey = nanoid(7);

    const newActivityTemplate = {
      title: "Yeni Aktivite",
      explanation: "",
      audio: null,
      image: null,
      textContent: null,
      youtubeVideoUrl: null,
      activityType: "type-in-blanks",
      questions: [],
    } as Activity<any>;

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: `SET #lessons.#lessonId.#activities.#idOrderMeta = list_append(#lessons.#lessonId.#activities.#idOrderMeta, :newActivityMeta), #lessons.#lessonId.#activities.#newActivityIdKey = :newActivity`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#activities": "activities",
        "#idOrderMeta": "idOrderMeta",
        "#newActivityIdKey": newActivityIdKey,
      },
      ExpressionAttributeValues: marshall({
        ":newActivityMeta": [newActivityIdKey],
        ":newActivity": newActivityTemplate,
      }),
    });

    try {
      await dbClient.send(updateCommand);
      return {
        status: "success",
        message: "Aktivite başarıyla oluşturuldu.",
        data: {
          meta: newActivityIdKey,
          activity: newActivityTemplate,
        },
      };
    } catch (error) {
      console.error("LessonRepository -> createNewActivity: ", error);
      return { status: "error", message: "Aktivite oluşturma başarısız." };
    }
  };

  deleteLesson = async (
    themeId: string,
    lessonId: string
  ): Promise<StatusResponse> => {
    const tableName = "themes";
    const key = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const getPrevLessonsCommand = new GetItemCommand({
      TableName: tableName,
      Key: key,
      ProjectionExpression: "lessons",
    });
    let prevLessons;

    try {
      prevLessons = unmarshall(
        (await dbClient.send(getPrevLessonsCommand)).Item!
      ).lessons;
    } catch (error) {
      return { status: "error", message: "Ders silme başarısız." };
    }

    const newLessons = { ...prevLessons };

    delete newLessons[lessonId];

    newLessons["meta"] = newLessons["meta"].filter(
      (lessonMeta: any) => lessonMeta.id !== lessonId
    );

    const deleteLessonCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: "SET #lessons = :updatedLessons",
      ExpressionAttributeNames: {
        "#lessons": "lessons",
      },
      ExpressionAttributeValues: marshall({
        ":updatedLessons": newLessons,
      }),
    });

    try {
      await dbClient.send(deleteLessonCommand);
      return { status: "success", message: "Ders başarıyla silindi." };
    } catch (error) {
      console.error("LessonRepository -> deleteLesson: ", error);
      return { status: "error", message: "Ders silme başarısız." };
    }
  };

  saveLesson = async ({
    themeId,
    lessonId,
    lessonIndex,
    title,
    explanation,
  }: {
    themeId: string;
    lessonId: string;
    lessonIndex: number;
    title: string;
    explanation: string;
  }): Promise<StatusResponse> => {
    const dbClient = DynamoDBClientSingleton.getInstance();

    const updateLessonMetaCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ PK: "theme", SK: themeId }),
      UpdateExpression: `SET #lessons.#meta[${lessonIndex}].#title = :newTitle`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#meta": "meta",
        "#title": "title",
      },
      ExpressionAttributeValues: marshall({
        ":newTitle": title,
      }),
    });

    const updateLessonDataCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ PK: "theme", SK: themeId }),
      UpdateExpression: `SET #lessons.#lessonId.#title = :newTitle, #lessons.#lessonId.#explanation = :newExplanation`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#title": "title",
        "#explanation": "explanation",
      },
      ExpressionAttributeValues: marshall({
        ":newTitle": title,
        ":newExplanation": explanation,
      }),
    });

    try {
      await Promise.all([
        dbClient.send(updateLessonMetaCommand),
        dbClient.send(updateLessonDataCommand),
      ]);
      return { status: "success", message: "Ders başarıyla güncellendi." };
    } catch (error) {
      console.error("LessonRepository -> saveLesson: ", error);
      return { status: "error", message: "Ders güncelleme başarısız." };
    }
  };
}
