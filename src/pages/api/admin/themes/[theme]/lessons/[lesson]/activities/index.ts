import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBActivityRepository } from "@/backend/repositories/activity/dynamo_db_activity_repository";
import { BackendActivityService } from "@/backend/services/activity_service";
import { ApiResponse } from "@/api/api_response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const activityRepo = new DynamoDBActivityRepository();
  const backendActivityService = new BackendActivityService(activityRepo);
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "POST") {
    const repRes = await backendActivityService.createActivity(
      theme,
      lesson,
      req.body.activity
    );
    res.status(201).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
