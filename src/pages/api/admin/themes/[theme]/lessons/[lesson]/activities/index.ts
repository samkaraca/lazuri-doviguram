import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBActivityRepository } from "@/backend/repositories/activity/dynamo_db_activity_repository";
import { BackendActivityService } from "@/backend/services/activity_service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const activityRepo = new DynamoDBActivityRepository();
  const activityApiService = new BackendActivityService(activityRepo);
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "POST") {
    const repRes = await activityApiService.createActivity(
      theme,
      lesson,
      req.body.activity
    );
    return res.status(201).send(repRes);
  }

  return res.status(405).json({ error: "Unsopported request method" });
}
