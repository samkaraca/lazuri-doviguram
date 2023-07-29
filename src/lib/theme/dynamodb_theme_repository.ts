import { DynamoDBClientSingleton } from "../utils/dynamo_db_client_singleton";
import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  TransactWriteItemsCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ThemeRepository } from "./theme_repository";
import { DBTheme } from "../types/db_types/db_theme";

const dynamoDB = DynamoDBClientSingleton.getInstance();

export class DynamoDBThemeRepository implements ThemeRepository {
  relocateTheme = async (oldThemeId: string, theme: DBTheme): Promise<any> => {
    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: "themes",
            Item: marshall({
              ...theme,
            }),
            ConditionExpression: "attribute_not_exists(pk)",
          },
        },
        {
          Delete: {
            TableName: "themes",
            Key: marshall({
              pk: "theme",
              id: oldThemeId,
            }),
            ConditionExpression: "attribute_exists(pk)",
          },
        },
      ],
    });

    return await dynamoDB.send(command);
  };

  createTheme = async (theme: DBTheme): Promise<any> => {
    const command = new PutItemCommand({
      TableName: "themes",
      Item: marshall({
        ...theme,
      }),
    });

    return await dynamoDB.send(command);
  };

  saveTheme = async (
    theme: Pick<DBTheme, "id" | "explanation" | "image" | "youtubeVideoUrl">
  ): Promise<any> => {
    const updateCommand = new UpdateItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: theme.id }),
      UpdateExpression:
        "SET #explanation = :explanation, #image = :image, #youtubeVideoUrl = :youtubeVideoUrl",
      ExpressionAttributeNames: {
        "#explanation": "explanation",
        "#image": "image",
        "#youtubeVideoUrl": "youtubeVideoUrl",
      },
      ExpressionAttributeValues: marshall({
        ":explanation": theme.explanation,
        ":image": theme.image,
        ":youtubeVideoUrl": theme.youtubeVideoUrl,
      }),
    });

    return await dynamoDB.send(updateCommand);
  };

  deleteTheme = async (themeId: string): Promise<any> => {
    const deleteCommand = new DeleteItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
    });

    return await dynamoDB.send(deleteCommand);
  };

  getTheme = async (themeId: string): Promise<DBTheme> => {
    const queryCommand = new GetItemCommand({
      TableName: "themes",
      Key: marshall({ pk: "theme", id: themeId }),
    });

    const resItem = (await dynamoDB.send(queryCommand)).Item;
    if (!resItem) throw Error();
    return unmarshall(resItem) as any;
  };

  getThemePathNames = async (): Promise<string[]> => {
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "#pk = :pk",
      ExpressionAttributeNames: {
        "#pk": "pk",
      },
      ExpressionAttributeValues: marshall({
        ":pk": "theme",
      }),
      ProjectionExpression: "pathName",
    });

    const resItems = (await dynamoDB.send(queryCommand)).Items;
    if (!resItems) throw Error();
    return resItems.map((item) => unmarshall(item).pathName);
  };

  getThemeMetas = async (): Promise<
    Pick<DBTheme, "id" | "title" | "image" | "lessons" | "createdAt">[]
  > => {
    const queryCommand = new QueryCommand({
      TableName: "themes",
      KeyConditionExpression: "#pk = :pk",
      ExpressionAttributeNames: {
        "#pk": "pk",
      },
      ExpressionAttributeValues: marshall({
        ":pk": "theme",
      }),
      ProjectionExpression: "id, title, image, lessons, createdAt",
    });

    const resItems = (await dynamoDB.send(queryCommand)).Items;
    if (!resItems) throw Error();
    return resItems.map((item) => unmarshall(item)) as any;
  };

  getThemeId = async (pathName: string): Promise<string> => {
    const command = new ScanCommand({
      TableName: "themes",
      FilterExpression: "#pathName = :pathName",
      ProjectionExpression: "id",
      ExpressionAttributeNames: {
        "#pathName": "pathName",
      },
      ExpressionAttributeValues: marshall({
        ":pathName": pathName,
      }),
      Limit: 1,
    });

    const resItems = (await dynamoDB.send(command)).Items;
    if (!resItems || resItems.length !== 1) throw Error();
    return unmarshall(resItems[0]).id as any;
  };
}
