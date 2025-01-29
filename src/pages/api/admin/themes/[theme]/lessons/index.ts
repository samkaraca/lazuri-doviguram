import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { createLesson } from "@/backend/services/lesson/createLesson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { theme } = req.query as { theme: string };

  if (req.method === "POST") {
    const repRes = await createLesson({
      themeSlug: theme,
      lesson: req.body.lesson,
    });
    res.status(201).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
