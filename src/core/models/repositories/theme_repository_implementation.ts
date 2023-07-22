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
import { Theme } from "../entities/learning_unit";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { StatusResponse } from "./status_response";

export class ThemeReposityImplementation implements ThemeRepository {
  saveTheme = async ({
    themeId,
    title,
    image,
    youtubeVideoUrl,
    explanation,
  }: {
    themeId: string;
    title: string;
    image: string;
    youtubeVideoUrl: string;
    explanation: string;
  }): Promise<StatusResponse> => {
    slugify.extend({ ǩ: "k", ǯ: "z", ʒ: "z" });
    const newURLPath = slugify(title.toLowerCase(), {
      strict: true,
    });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ PK: "theme", SK: themeId }),
      UpdateExpression:
        "SET #title = :newTitle, #explanation = :newExplanation, #image = :newImage, #youtubeVideoUrl = :newYoutubeVideoUrl, #URLPath = :newURLPath",
      ExpressionAttributeNames: {
        "#title": "title",
        "#explanation": "explanation",
        "#image": "image",
        "#youtubeVideoUrl": "youtubeVideoUrl",
        "#URLPath": "URLPath",
      },
      ExpressionAttributeValues: marshall({
        ":newTitle": title,
        ":newExplanation": explanation,
        ":newImage": image,
        ":newYoutubeVideoUrl": youtubeVideoUrl,
        ":newURLPath": newURLPath,
      }),
    });

    try {
      await dbClient.send(updateCommand);
      return { status: "success", message: "Tema başarıyla güncellendi." };
    } catch (error) {
      return { status: "error", message: "Tema güncelleme başarısız." };
    }
  };

  getThemeIds = async (): Promise<any> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "theme" },
      },
      ProjectionExpression: "SK",
    });

    const rawThemeIdDatas = await dbClient.send(queryCommand);
    const themeIds = rawThemeIdDatas.Items!.map((item) => unmarshall(item));

    return themeIds;
  };

  getThemeMetas = async (): Promise<ThemeMetaDTO[]> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "theme" },
      },
      ProjectionExpression: "SK, title, image, lessons.meta, createdAt",
    });

    const rawThemeMetaDatas = await dbClient.send(queryCommand);

    const themeMetas = rawThemeMetaDatas.Items!.map((item) => {
      const { SK, title, image, lessons, createdAt } = unmarshall(item);

      const pLesson = lessons.meta;

      return {
        id: SK,
        title,
        image,
        lessons: pLesson,
        createdAt,
      } as ThemeMetaDTO;
    });

    return themeMetas.sort((a, b) => a.createdAt - b.createdAt);
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

  createNewTheme = async (): Promise<StatusResponse> => {
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
        createdAt: Date.now(),
      }),
    });

    try {
      await dbClient.send(updateCommand);
      return {
        status: "success",
        message: "Tema başarıyla oluşturuldu.",
        data: { newThemeId },
      };
    } catch (error) {
      return { status: "error", message: "Tema oluşturma başarısız." };
    }
  };

  deleteTheme = async (themeId: string): Promise<StatusResponse> => {
    const tableName = "themes";
    const key = marshall({ PK: "theme", SK: themeId });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const deleteCommand = new DeleteItemCommand({
      TableName: tableName,
      Key: key,
    });

    try {
      await dbClient.send(deleteCommand);
      return { status: "success", message: "Tema başarıyla silindi." };
    } catch (error) {
      return { status: "error", message: "Tema silme başarısız." };
    }
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

    try {
      const res = await dbClient.send(updateCommand);
      return {
        status: "success",
        message: "Yeni ders başarıyla oluşturuldu.",
        data: unmarshall(res.Attributes!),
      };
    } catch (error) {
      return { status: "error", message: "Yeni ders oluşturma başarısız." };
    }
  };
}
