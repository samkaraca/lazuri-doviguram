import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBLessonRepository } from "@/backend/repositories/lesson/dynamodb_lesson_repository";
import { BackendLessonService } from "@/backend/services/lesson_service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonRepo = new DynamoDBLessonRepository();
  const lessonApiService = new BackendLessonService(lessonRepo);
  const { theme } = req.query as { theme: string; lesson: string };

  if (req.method === "POST") {
    const repRes = await lessonApiService.createLesson(theme, req.body.lesson);
    return res.status(201).send(repRes);
  }

  return res.status(405).json({ error: "Unsopported request method" });
}
