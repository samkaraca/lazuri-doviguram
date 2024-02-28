import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBThemeRepository } from "@/backend/repositories/theme/dynamodb_theme_repository";
import { BackendThemeService } from "@/backend/services/theme_service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const themeRepo = new DynamoDBThemeRepository();
  const themeApiService = new BackendThemeService(themeRepo);
  const theme = req.query.theme as string;

  if (req.method === "GET") {
    const repRes = await themeApiService.getTheme(theme);
    return res.status(200).json(repRes);
  } else if (req.method === "PUT") {
    const type = req.query.type;

    if (type === "save-theme") {
      const repRes = await themeApiService.saveTheme(req.body.theme);
      return res.status(200).send(repRes);
    } else if (type === "relocate-theme") {
      const repRes = await themeApiService.relocateTheme(theme, req.body.theme);
      return res.status(200).send(repRes);
    }

    return res.status(400).json({ error: "Unsopported action" });
  } else if (req.method === "DELETE") {
    const repRes = await themeApiService.deleteTheme(theme);
    return res.status(204).json(repRes);
  }

  return res.status(405).json({ error: "Unsopported request method" });
}
