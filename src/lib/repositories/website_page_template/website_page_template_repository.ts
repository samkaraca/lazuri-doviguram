import { ApiResponse } from "@/lib/types/api_response";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

export interface IWebsitePageTemplateRepository {
  getIndexPageTemplate: () => Promise<ApiResponse<IndexPageTemplate>>;
}
