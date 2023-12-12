import { DynamoDBClientSingleton } from "@/lib/utils/dynamo_db_client_singleton";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { IWebsitePageTemplateRepository } from "./website_page_template_repository";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";
import { ApiResponse } from "@/lib/types/api_response";

const dynamoDB = DynamoDBClientSingleton.getInstance();

export class DynamoDBWebsitePageTemplateRepository
  implements IWebsitePageTemplateRepository
{
  getIndexPageTemplate = async (): Promise<ApiResponse<IndexPageTemplate>> => {
    try {
      const command = new GetItemCommand({
        TableName: "themes",
        Key: marshall({ pk: "website-template", id: "/" }),
      });

      const resItem = (await dynamoDB.send(command)).Item;
      if (!resItem) throw Error();
      return {
        status: "success",
        message: "",
        data: unmarshall(resItem) as any,
      };
    } catch (error) {
      console.error(
        "DynamoDBWebsitePageTemplateRepository -> getIndexPageTemplate: ",
        error
      );
      return { status: "error", message: "Sayfa şablonu alınamadı." };
    }
  };
}
