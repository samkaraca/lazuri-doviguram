import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { createActivity } from "@/backend/services/activity/createActivity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "POST") {
    const repRes = await createActivity({
      lessonId: lesson,
      activity: req.body.activity,
    });
    res.status(201).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
