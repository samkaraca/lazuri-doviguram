import { ApiResponse } from "@/api/api_response";
import { deleteActivity } from "@/backend/services/activity/deleteActivity";
import { getActivity } from "@/backend/services/activity/getActivity";
import { updateActivity } from "@/backend/services/activity/updateActivity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { theme, lesson, activity } = req.query as {
    theme: string;
    lesson: string;
    activity: string;
  };

  if (req.method === "GET") {
    const rawData = await getActivity({ activityId: activity });
    res.status(200).json(rawData);
  } else if (req.method === "PUT") {
    const repRes = await updateActivity(
      req.body.activity
    );
    res.status(200).json(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await deleteActivity({ activityId: activity });
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
