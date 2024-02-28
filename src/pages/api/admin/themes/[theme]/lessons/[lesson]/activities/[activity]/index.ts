import { ApiResponse } from "@/api/api_response";
import { DynamoDBActivityRepository } from "@/backend/repositories/activity/dynamo_db_activity_repository";
import { BackendActivityService } from "@/backend/services/activity_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const activityRepo = new DynamoDBActivityRepository();
  const backendActivityService = new BackendActivityService(activityRepo);
  const { theme, lesson, activity } = req.query as {
    theme: string;
    lesson: string;
    activity: string;
  };

  if (req.method === "GET") {
    const rawData = await backendActivityService.getActivity(
      theme,
      lesson,
      activity
    );
    res.status(200).json(rawData);
  } else if (req.method === "PUT") {
    const repRes = await backendActivityService.saveActivity(
      theme,
      lesson,
      req.body.activity
    );
    res.status(200).json(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await backendActivityService.deleteActivity(
      theme,
      lesson,
      activity
    );
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
