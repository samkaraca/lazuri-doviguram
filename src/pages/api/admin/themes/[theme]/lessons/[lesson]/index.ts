import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBLessonRepository } from "@/backend/repositories/lesson/dynamodb_lesson_repository";
import { BackendLessonService } from "@/backend/services/lesson_service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonRepo = new DynamoDBLessonRepository();
  const lessonApiService = new BackendLessonService(lessonRepo);
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "PUT") {
    const repRes = await lessonApiService.saveLesson(theme, req.body.lesson);
    return res.status(200).send(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await lessonApiService.deleteLesson(theme, lesson);
    return res.status(204).send(repRes);
  }

  return res.status(405).json({ error: "Unsopported request method" });
}
