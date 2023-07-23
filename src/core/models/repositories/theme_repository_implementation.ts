import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
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
  }): Promise<StatusResponse<{ pathName: string }>> => {
    slugify.extend({ ǩ: "k", ǯ: "z", ʒ: "z" });
    const newPathName = slugify(title.toLowerCase(), {
      strict: true,
    });

    const dbClient = DynamoDBClientSingleton.getInstance();
    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ PK: "theme", SK: themeId }),
      UpdateExpression:
        "SET #title = :newTitle, #explanation = :newExplanation, #image = :newImage, #youtubeVideoUrl = :newYoutubeVideoUrl, #pathName = :newPathName",
      ExpressionAttributeNames: {
        "#title": "title",
        "#explanation": "explanation",
        "#image": "image",
        "#youtubeVideoUrl": "youtubeVideoUrl",
        "#pathName": "pathName",
      },
      ExpressionAttributeValues: marshall({
        ":newTitle": title,
        ":newExplanation": explanation,
        ":newImage": image,
        ":newYoutubeVideoUrl": youtubeVideoUrl,
        ":newPathName": newPathName,
      }),
    });

    try {
      await dbClient.send(updateCommand);
      return {
        status: "success",
        message: "Tema başarıyla güncellendi.",
        data: { pathName: newPathName },
      };
    } catch (error) {
      console.error("ThemeRepository -> saveTheme: ", error);
      return { status: "error", message: "Tema güncelleme başarısız." };
    }
  };

  getThemePathNames = async (): Promise<StatusResponse<string[]>> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "theme" },
      },
      ProjectionExpression: "pathName",
    });

    try {
      const rawThemeIdDatas = await dbClient.send(queryCommand);
      const themeIds = rawThemeIdDatas.Items!.map(
        (item) => unmarshall(item).pathName
      );
      return { status: "success", message: "", data: themeIds };
    } catch (error) {
      console.error("ThemeRepository -> getThemeIds: ", error);
      return { status: "error", message: "" };
    }
  };

  getThemeMetas = async (): Promise<StatusResponse<ThemeMetaDTO[]>> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "theme" },
      },
      ProjectionExpression:
        "SK, title, image, lessons.meta, createdAt, pathName",
    });

    try {
      const data = await dbClient.send(queryCommand);
      const items = data.Items
        ? data.Items.map((item) => unmarshall(item))
        : [];
      const themeMetas = items.map((item) => {
        const { SK, title, image, lessons, createdAt, pathName } = item;
        const lessonsMeta = lessons.meta;
        return {
          id: SK,
          title,
          image,
          lessons: lessonsMeta,
          createdAt,
          pathName,
        } as ThemeMetaDTO;
      });
      themeMetas.sort((a, b) => a.createdAt - b.createdAt);
      return { status: "success", message: "", data: themeMetas };
    } catch (error) {
      console.error("ThemeRepository -> getThemeMetas: ", error);
      return { status: "error", message: "" };
    }
  };

  getThemeData = async (pathName: string): Promise<StatusResponse<Theme>> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const queryCommand = new ScanCommand({
      TableName: "themes",
      FilterExpression: "#pk = :pk AND #pathName = :pathName",
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#pathName": "pathName",
      },
      ExpressionAttributeValues: marshall({
        ":pk": "theme",
        ":pathName": pathName,
      }),
      ProjectionExpression:
        "SK, explanation, image, lessons, title, youtubeVideoUrl, pathName, createdAt",
    });

    try {
      const data = await dbClient.send(queryCommand);
      const items = data.Items
        ? data.Items.map((item) => unmarshall(item))
        : [];
      if (items.length !== 1)
        throw Error(
          `Theme count with specified path name ${pathName} should have been exactly one instead of ${items.length}`
        );
      const {
        SK,
        explanation,
        image,
        lessons,
        title,
        youtubeVideoUrl,
        createdAt,
      } = items[0];

      return {
        status: "success",
        message: "",
        data: {
          id: SK,
          pathName: items[0].pathName,
          title,
          explanation,
          image,
          youtubeVideoUrl,
          lessons,
          createdAt,
        },
      };
    } catch (error) {
      console.error("ThemeRepository -> getThemeData: ", error);
      return { status: "error", message: "" };
    }
  };

  createNewTheme = async (): Promise<StatusResponse> => {
    const dbClient = DynamoDBClientSingleton.getInstance();
    const newThemeId = nanoid(7);
    slugify.extend({ ǩ: "k", ǯ: "z", ʒ: "z" });
    const newPathName = slugify(newThemeId.toLowerCase(), {
      strict: true,
    });

    const updateCommand = new PutItemCommand({
      TableName: "themes",
      Item: marshall({
        PK: "theme",
        SK: newThemeId,
        title: "Tema Başlığı",
        pathName: newPathName,
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
      console.error("ThemeRepository -> createNewTheme: ", error);
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
      console.error("ThemeRepository -> deleteTheme: ", error);
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
      console.error("ThemeRepository -> createNewLesson: ", error);
      return { status: "error", message: "Yeni ders oluşturma başarısız." };
    }
  };
}
