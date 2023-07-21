import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = new ThemeReposityImplementation();

  if (req.method === "PUT") {
    let DBResponse;
    const theme = req.query.theme as string;
    const { type } = req.body;

    if (type === "saveTheme") {
      const { title, explanation, image, youtubeVideoUrl } = req.body;
      DBResponse = await themeRepo.saveTheme({
        themeId: theme,
        title,
        explanation,
        image,
        youtubeVideoUrl,
      });

      return res.status(200).send(DBResponse);
    } else if (type === "createLesson") {
      DBResponse = await themeRepo.createNewLesson(theme);

      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
