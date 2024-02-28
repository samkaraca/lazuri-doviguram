import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBLessonRepository } from "@/backend/repositories/lesson/dynamodb_lesson_repository";
import { BackendLessonService } from "@/backend/services/lesson_service";
import { ApiResponse } from "@/api/api_response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const lessonRepo = new DynamoDBLessonRepository();
  const backendLessonService = new BackendLessonService(lessonRepo);
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "PUT") {
    const repRes = await backendLessonService.saveLesson(
      theme,
      req.body.lesson
    );
    res.status(200).json(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await backendLessonService.deleteLesson(theme, lesson);
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
