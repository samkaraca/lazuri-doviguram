import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBThemeRepository } from "@/backend/repositories/theme/dynamodb_theme_repository";
import { DynamoDBLessonRepository } from "@/backend/repositories/lesson/dynamodb_lesson_repository";
import LessonApiService from "@/backend/services/lesson_service";
import ThemeApiService from "@/backend/services/theme_service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = new DynamoDBThemeRepository();
  const lessonRepo = new DynamoDBLessonRepository();
  const lessonApiService = new LessonApiService(lessonRepo);
  const themeApiService = new ThemeApiService(themeRepo);
  const theme = req.query.theme as string;

  if (req.method === "PUT") {
    const type = req.body.type;

    if (type === "createLesson") {
      const repRes = await lessonApiService.createLesson(
        theme,
        req.body.lesson
      );
      return res.status(200).send(repRes);
    } else if (type === "saveLesson") {
      const repRes = await lessonApiService.saveLesson(theme, req.body.lesson);
      return res.status(200).send(repRes);
    } else if (type === "relocateTheme") {
      const repRes = await themeApiService.relocateTheme(theme, req.body.theme);
      return res.status(200).send(repRes);
    }
  } else if (req.method === "DELETE") {
    const repRes = await themeApiService.deleteTheme(theme);
    return res.status(200).json(repRes);
  } else if (req.method === "GET") {
    const repRes = await themeApiService.getTheme(theme);
    return res.status(200).json(repRes);
  } else if (req.method === "POST") {
    const type = req.body.type;

    if (type === "publishChanges") {
      try {
        await res.revalidate(`/temalar/${theme}`);
        await res.revalidate("/");
        return res.status(200).send({
          status: "success",
          message: "Değişiklikler başarıyla yayınlandı.",
        });
      } catch (error) {
        console.error(
          `/api/admin/temalar/${theme} -> POST -> publishChanges ->`,
          error
        );
        return res.status(200).send({
          status: "error",
          message: "Değişikliklerin yayınlanması başarısız.",
        });
      }
    }
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
