import { ApiResponse } from "@/api/api_response";
import IActivity from "@/lib/activity/activity";
import dbConnect from "@/backend/lib/db";
import { Activity } from "@/backend/models/Theme";

export const getActivity = async ({
  activityId,
}: {
  activityId: string;
}): Promise<ApiResponse<IActivity>> => {
  try {
    await dbConnect();
    const mongooseActivity = await Activity.findOne({ _id: activityId });
    console.log("mongooseActivity", mongooseActivity);
    const activityData = {
      id: mongooseActivity._id.toString(),
      title: mongooseActivity.title,
      explanation: mongooseActivity.explanation,
      textContent: mongooseActivity.textContent,
      image: mongooseActivity.image,
      youtubeVideoUrl: mongooseActivity.youtubeVideoUrl,
      audio: mongooseActivity.audio,
      savedAt: mongooseActivity.savedAt,
      type: mongooseActivity.type,
      exercise: JSON.parse(mongooseActivity.exercise),
    }

    return {
      status: "success",
      message: "",
      data: activityData,
    };
  } catch (error) {
    console.error("ActivityApiService -> getActivity: ", error);
    return { status: "error", message: "" };
  }
}