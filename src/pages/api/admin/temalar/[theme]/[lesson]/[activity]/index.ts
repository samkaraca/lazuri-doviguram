import type { NextApiRequest, NextApiResponse } from "next";
import { ActivityRepositoryImplementation } from "@/core/models/repositories/activity_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const activityRepo = new ActivityRepositoryImplementation();

  if (req.method === "PUT") {
    const { theme, lesson, activity } = req.query as {
      theme: string;
      lesson: string;
      activity: string;
    };
    const { type } = req.body;

    if (type === "saveActivity") {
      const DBResponse = await activityRepo.saveActivity(
        theme,
        lesson,
        activity,
        req.body.activity
      );
      return res.status(200).send(DBResponse);
    } else if (type === "deleteActivity") {
      const DBResponse = await activityRepo.deleteActivity({
        themeId: theme,
        lessonId: lesson,
        activityId: activity,
        activityIndex: req.body.activityIndex,
      });
      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
