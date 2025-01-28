import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { updateLesson } from "@/backend/services/lesson/updateLesson";
import { deleteLesson } from "@/backend/services/lesson/deleteLesson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "PUT") {
    const repRes = await updateLesson({
      lesson: req.body.lesson,
    });
    res.status(200).json(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await deleteLesson({ lessonId: lesson });
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
