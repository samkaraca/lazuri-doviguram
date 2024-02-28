import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBThemeRepository } from "@/backend/repositories/theme/dynamodb_theme_repository";
import { BackendThemeService } from "@/backend/services/theme_service";
import { ApiResponse } from "@/api/api_response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const themeRepo = new DynamoDBThemeRepository();
  const backendThemeService = new BackendThemeService(themeRepo);

  if (req.method === "POST") {
    const repRes = await backendThemeService.createTheme(req.body.theme);
    res.status(201).json(repRes);
  } else if (req.method === "GET") {
    const type = req.query.type;

    if (type === "path-names") {
      const repRes = await backendThemeService.getThemeIds();
      res.status(200).json(repRes);
    } else if (type === "theme-metas") {
      const repRes = await backendThemeService.getThemeMetas();
      res.status(200).json(repRes);
    } else {
      res.status(400).json({ status: "error", message: "Unsopported action" });
    }
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
