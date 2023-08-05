import { DynamoDBActivityRepository } from "@/lib/repositories/activity/dynamo_db_activity_repository";
import ActivityApiService from "@/lib/services/activity/activity_api_service";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const activityRepo = new DynamoDBActivityRepository();
  const activityApiService = new ActivityApiService(activityRepo);
  const { theme, lesson, activity } = req.query as {
    theme: string;
    lesson: string;
    activity: string;
  };

  if (req.method === "GET") {
    const rawData = await activityApiService.getActivity(
      theme,
      lesson,
      activity
    );
    return res.status(200).json(rawData);
  } else if (req.method === "DELETE") {
    const repRes = await activityApiService.deleteActivity(
      theme,
      lesson,
      activity
    );
    return res.status(200).send(repRes);
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
