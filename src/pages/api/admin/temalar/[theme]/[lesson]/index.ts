import type { NextApiRequest, NextApiResponse } from "next";
import { LessonRepositoryImplementation } from "@/core/models/repositories/lesson_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lessonRepo = new LessonRepositoryImplementation();

  if (req.method === "PUT") {
    let DBResponse;
    const { theme, lesson } = req.query as { theme: string; lesson: string };
    const { type } = req.body;

    if (type === "saveLesson") {
      const { title, explanation, lessonIndex } = req.body;
      DBResponse = await lessonRepo.saveLesson({
        themeId: theme,
        lessonId: lesson,
        lessonIndex,
        title,
        explanation,
      });
      return res.status(200).send(DBResponse);
    } else if (type === "deleteLesson") {
      DBResponse = await lessonRepo.deleteLesson(theme, lesson);

      return res.status(200).send(DBResponse);
    } else if (type === "createNewActivity") {
      DBResponse = await lessonRepo.createNewActivity(theme, lesson);

      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
