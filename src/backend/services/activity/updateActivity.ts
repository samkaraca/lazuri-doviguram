import { ApiResponse } from "@/api/api_response";
import IActivity from "@/lib/activity/activity";
import dbConnect from "@/backend/lib/db";
import { Activity } from "@/backend/models/Theme";

export const updateActivity = async ({
    activity,
}: {
    activity: IActivity;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const activityToSave = { ...activity } as any;
        delete activityToSave.id;

        const mongooseActivity = await Activity.updateOne({ _id: activity.id }, {
            $set: {
                audio: activity.audio,
                image: activity.image,
                textContent: activity.textContent,
                title: activity.title,
                youtubeVideoUrl: activity.youtubeVideoUrl,
                exercise: JSON.stringify(activity.exercise),
                explanation: activity.explanation,
                savedAt: activity.savedAt,
                type: activity.type,
            }
        });
        console.log("mongooseActivity", mongooseActivity);
        return { status: "success", message: "Aktivite başarıyla kaydedildi." };
    } catch (error) {
        console.error("ActivityApiService -> saveActivity: ", error);
        return { status: "error", message: "Aktivite kaydetme başarısız." };
    }
}