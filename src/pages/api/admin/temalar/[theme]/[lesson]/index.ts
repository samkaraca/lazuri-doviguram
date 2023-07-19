import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = ThemeReposityImplementation.getInstance();

  if (req.method === "PUT") {
    let DBResponse;
    const { theme, lesson } = req.query as { theme: string; lesson: string };
    const { type } = req.body;

    if (type === "setLessonTitle") {
      const { newTitle } = req.body;
      const lessonIndex = parseInt(lesson, 10);
      DBResponse = await themeRepo.saveLessonTitle(
        newTitle,
        theme,
        lessonIndex
      );
      return res.status(200).send(DBResponse);
    } else if (type === "setLessonExplanation") {
      const { newExplanation } = req.body;
      DBResponse = await themeRepo.saveLessonExplanation(
        newExplanation,
        theme,
        lesson
      );
      return res.status(200).send(DBResponse);
    } else if (type === "createNewActivity") {
      DBResponse = await themeRepo.createNewActivity(theme, lesson);
      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
