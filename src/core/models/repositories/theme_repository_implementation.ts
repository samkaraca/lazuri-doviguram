import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { ThemeRepository } from "./theme_repository";
import { DynamoDBClientSingleton } from "@/core/utils/dynamo_db_client_singleton";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ThemeMetaDTO } from "../dtos/theme_meta_dto";
import { Activity, LessonMap, Theme } from "../entities/learning_unit";
import slugify from "slugify";
import { nanoid } from "nanoid";

export class ThemeReposityImplementation implements ThemeRepository {
  private static instance: ThemeReposityImplementation;

  private constructor() {}

  public static getInstance(): ThemeReposityImplementation {
    if (!ThemeReposityImplementation.instance) {
      ThemeReposityImplementation.instance = new ThemeReposityImplementation();
    }

    return ThemeReposityImplementation.instance;
  }

  getThemeMetas = async (): Promise<ThemeMetaDTO[]> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "theme" },
      },
      ProjectionExpression: "SK, title, image, lessons.meta",
    });

    const rawThemeMetaDatas = await dbClient.send(queryCommand);

    const themeMetas = rawThemeMetaDatas.Items!.map((item) => {
      const { SK, title, image, lessons } = unmarshall(item);

      const pLesson = lessons.meta;

      return {
        id: SK,
        title,
        image,
        lessons: pLesson,
      } as ThemeMetaDTO;
    });

    return themeMetas;
  };

  getThemeData = async (themePath: string): Promise<Theme> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new GetItemCommand({
      TableName: "themes",
      Key: {
        PK: { S: "theme" },
        SK: { S: themePath },
      },
      ProjectionExpression:
        "SK, explanation, image, lessons, title, URLPath, youtubeVideoUrl",
    });

    const themeData = await dbClient.send(queryCommand);
    const { SK, title, explanation, image, youtubeVideoUrl, lessons, URLPath } =
      unmarshall(themeData.Item!);

    return {
      id: SK,
      URLPath,
      title,
      explanation,
      image,
      youtubeVideoUrl,
      lessons,
    } as Theme;
  };

  saveThemeTitle = async (newTitle: string, themeId: string): Promise<any> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });
    slugify.extend({ ǩ: "k", ǯ: "z", ʒ: "z" });
    const newPath = slugify(newTitle.toLowerCase(), {
      strict: true,
    });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: "SET #title = :newTitle, #URLPath = :newPath",
      ExpressionAttributeNames: {
        "#title": "title",
        "#URLPath": "URLPath",
      },
      ExpressionAttributeValues: marshall({
        ":newTitle": newTitle,
        ":newPath": newPath,
      }),
    });

    const result = await dbClient.send(updateCommand);

    return result;
  };

  saveThemeExplanation = async (
    newExplanation: string,
    themeId: string
  ): Promise<any> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: "SET #explanation = :newExplanation",
      ExpressionAttributeNames: {
        "#explanation": "explanation",
      },
      ExpressionAttributeValues: marshall({
        ":newExplanation": newExplanation,
      }),
    });

    const result = await dbClient.send(updateCommand);

    return result;
  };

  saveThemeImage = async (newImage: string, themeId: string): Promise<any> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: "SET #image = :newImage",
      ExpressionAttributeNames: {
        "#image": "image",
      },
      ExpressionAttributeValues: marshall({
        ":newImage": newImage,
      }),
    });

    const result = await dbClient.send(updateCommand);

    return result;
  };

  saveThemeYoutubeVideoUrl = async (
    newYoutubeVideoUrl: string,
    themeId: string
  ): Promise<any> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: "SET #youtubeVideoUrl = :newYoutubeVideoUrl",
      ExpressionAttributeNames: {
        "#youtubeVideoUrl": "youtubeVideoUrl",
      },
      ExpressionAttributeValues: marshall({
        ":newYoutubeVideoUrl": newYoutubeVideoUrl,
      }),
    });

    const result = await dbClient.send(updateCommand);

    return result;
  };

  saveLessonTitle = async (
    newTitle: string,
    themeId: string,
    lessonIndex: number
  ): Promise<any> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: `SET #lessons.#meta[${lessonIndex}].#title = :newTitle`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#meta": "meta",
        "#title": "title",
      },
      ExpressionAttributeValues: marshall({
        ":newTitle": newTitle,
      }),
    });

    const result = await dbClient.send(updateCommand);

    return result;
  };

  saveLessonExplanation = async (
    newExplanation: string,
    themeId: string,
    lessonId: string
  ): Promise<any> => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: `SET #lessons.#lessonId.#explanation = :newExplanation`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#lessonId": lessonId,
        "#explanation": "explanation",
      },
      ExpressionAttributeValues: marshall({
        ":newExplanation": newExplanation,
      }),
    });

    const result = await dbClient.send(updateCommand);

    return result;
  };

  createNewTheme = async () => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const newThemeId = nanoid(7);

    const updateCommand = new PutItemCommand({
      TableName: "themes",
      Item: marshall({
        PK: "theme",
        SK: newThemeId,
        title: "Tema Başlığı",
        URLPath: "tema-basligi",
        explanation: "Tema açıklaması...",
        youtubeVideoUrl: "https://youtu.be/jzUHgC7Tylk",
        image: "default.jpg",
        lessons: { meta: [] },
      }),
    });

    const result = await dbClient.send(updateCommand);

    return newThemeId;
  };

  createNewLesson = async (themeId: string) => {
    const tableName = "themes";
    const primaryKey = marshall({ PK: "theme", SK: themeId });
    const newLessonIdKey = nanoid(7);

    const newLessonMetaTemplate = {
      id: newLessonIdKey,
      title: "Yeni Ders",
    };

    const newLessonTemplate = {
      explanation: "Ders açıklaması...",
      activities: { idOrderMeta: [] },
    };

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: primaryKey,
      UpdateExpression: `SET #lessons.#meta = list_append(#lessons.#meta, :newLessonMeta), #lessons.#newLessonIdKey = :newLesson`,
      ExpressionAttributeNames: {
        "#lessons": "lessons",
        "#meta": "meta",
        "#newLessonIdKey": newLessonIdKey,
      },
      ExpressionAttributeValues: marshall({
        ":newLessonMeta": [newLessonMetaTemplate],
        ":newLesson": newLessonTemplate,
      }),
      ReturnValues: "UPDATED_NEW",
    });

    const result = await dbClient.send(updateCommand);

    return unmarshall(result.Attributes!);
  };

  deleteTheme = async (themeId: string) => {
    const tableName = "themes";
    const key = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const deleteCommand = new DeleteItemCommand({
      TableName: tableName,
      Key: key,
    });

    const result = await dbClient.send(deleteCommand);

    return result;
  };

  deleteLesson = async (themeId: string, lessonId: string) => {
    const tableName = "themes";
    const key = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const getPrevLessonsCommand = new GetItemCommand({
      TableName: tableName,
      Key: key,
      ProjectionExpression: "lessons",
    });

    const prevLessons = unmarshall(
      (await dbClient.send(getPrevLessonsCommand)).Item!
    ).lessons;

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

    const result = await dbClient.send(deleteLessonCommand);

    return result;
  };

  createNewActivity = async (themeId: string, lessonId: string) => {
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

    await dbClient.send(updateCommand);

    return {
      meta: newActivityIdKey,
      activity: newActivityTemplate,
    };
  };

  getActivity = async (themeId: string) => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new GetItemCommand({
      TableName: "themes",
      Key: {
        PK: { S: "theme" },
        SK: { S: themeId },
      },
      ProjectionExpression: "lessons",
    });

    const rawActivity = await dbClient.send(queryCommand);

    return rawActivity.Item!;
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
}
