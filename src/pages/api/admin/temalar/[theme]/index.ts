import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = ThemeReposityImplementation.getInstance();

  if (req.method === "PUT") {
    let DBResponse;
    const theme = req.query.theme as string;
    const { type } = req.body;

    if (type === "setThemeTitle") {
      const { newTitle } = req.body;
      DBResponse = await themeRepo.saveThemeTitle(newTitle, theme);

      return res.status(200).send(DBResponse);
    } else if (type === "setThemeExplanation") {
      const { newExplanation } = req.body;
      DBResponse = await themeRepo.saveThemeExplanation(newExplanation, theme);

      return res.status(200).send(DBResponse);
    } else if (type === "setThemeImage") {
      const { newImage } = req.body;
      DBResponse = await themeRepo.saveThemeImage(newImage, theme);

      return res.status(200).send(DBResponse);
    } else if (type === "setThemeYoutubeVideoUrl") {
      const { newUrl } = req.body;
      DBResponse = await themeRepo.saveThemeYoutubeVideoUrl(newUrl, theme);

      return res.status(200).send(DBResponse);
    } else if (type === "createNewLesson") {
      DBResponse = await themeRepo.createNewLesson(theme);

      return res.status(200).send(DBResponse);
    } else if (type === "deleteLesson") {
      const { lessonId } = req.body;
      DBResponse = await themeRepo.deleteLesson(theme, lessonId);

      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
