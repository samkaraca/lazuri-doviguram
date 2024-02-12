import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBThemeRepository } from "@/backend/repositories/theme/dynamodb_theme_repository";
import ThemeApiService from "@/backend/services/theme_service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const themeRepo = new DynamoDBThemeRepository();
  const themeApiService = new ThemeApiService(themeRepo);

  if (req.method === "PUT") {
    const type = req.body.type;
    if (type === "saveTheme") {
      const repRes = await themeApiService.saveTheme(req.body.theme);
      return res.status(200).send(repRes);
    } else if (type === "createTheme") {
      const repRes = await themeApiService.createTheme(req.body.theme);
      return res.status(200).send(repRes);
    }

    return res.status(501).json({ error: "Unsopported action" });
  } else if (req.method === "GET") {
    const r = req.query.r;
    if (r === "path-names") {
      const repRes = await themeApiService.getThemeIds();
      return res.status(200).json(repRes);
    } else if (r === "theme-metas") {
      const repRes = await themeApiService.getThemeMetas();
      return res.status(200).json(repRes);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}
