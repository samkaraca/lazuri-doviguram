import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBThemeRepository } from "@/backend/repositories/theme/dynamodb_theme_repository";
import { BackendThemeService } from "@/backend/services/theme_service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const themeRepo = new DynamoDBThemeRepository();
  const themeApiService = new BackendThemeService(themeRepo);

  if (req.method === "POST") {
    const repRes = await themeApiService.createTheme(req.body.theme);
    return res.status(201).send(repRes);
  } else if (req.method === "GET") {
    const type = req.query.type;

    if (type === "path-names") {
      const repRes = await themeApiService.getThemeIds();
      return res.status(200).json(repRes);
    } else if (type === "theme-metas") {
      const repRes = await themeApiService.getThemeMetas();
      return res.status(200).json(repRes);
    }

    return res.status(400).json({ error: "Unsopported action" });
  }

  return res.status(405).json({ error: "Unsopported request method" });
}
