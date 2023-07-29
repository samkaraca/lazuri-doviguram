import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBLessonRepository } from "@/lib/lesson/dynamodb_lesson_repository";
import { DynamoDBActivityRepository } from "@/lib/activity/dynamo_db_activity_repository";
import ActivityApiService from "@/lib/services/activity_api_service";
import LessonApiService from "@/lib/services/lesson_api_service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lessonRepo = new DynamoDBLessonRepository();
  const activityRepo = new DynamoDBActivityRepository();
  const lessonApiService = new LessonApiService(lessonRepo);
  const activityApiService = new ActivityApiService(activityRepo);
  const { theme, lesson } = req.query as { theme: string; lesson: string };

  if (req.method === "PUT") {
    const type = req.body.type;

    if (type === "createActivity") {
      const repRes = await activityApiService.createActivity(
        theme,
        lesson,
        req.body.activity
      );
      return res.status(200).send(repRes);
    } else if (type === "saveActivity") {
      const repRes = await activityApiService.saveActivity(
        theme,
        lesson,
        req.body.activity
      );
      return res.status(200).send(repRes);
    }
  } else if (req.method === "DELETE") {
    const repRes = await lessonApiService.deleteLesson(theme, lesson);
    return res.status(200).send(repRes);
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
