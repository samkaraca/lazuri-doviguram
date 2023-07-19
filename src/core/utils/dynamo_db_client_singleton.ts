import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export class DynamoDBClientSingleton {
  private static instance: DynamoDBClient;

  private constructor() {}

  public static getInstance(): DynamoDBClient {
    if (!DynamoDBClientSingleton.instance) {
      DynamoDBClientSingleton.instance = new DynamoDBClient({
        region: "eu-west-2",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });
    }

    return DynamoDBClientSingleton.instance;
  }
}
