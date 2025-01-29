import { Activity } from "@/backend/models/Theme";
import { ApiResponse } from "@/api/api_response";
import IActivity from "@/lib/activity/activity";
import dbConnect from "@/backend/lib/db";
import { Types } from "mongoose";

export const createActivity = async ({
    lessonId,
    activity,
}: {
    lessonId: string;
    activity: IActivity;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const mongooseActivity = new Activity({
            _id: new Types.ObjectId(),
            lessonId: new Types.ObjectId(lessonId),
            audio: activity.audio,
            image: activity.image,
            textContent: activity.textContent,
            title: activity.title,
            youtubeVideoUrl: activity.youtubeVideoUrl,
            exercise: JSON.stringify(activity.exercise),
            explanation: activity.explanation,
            savedAt: activity.savedAt,
            type: activity.type,
        });
        await mongooseActivity.save();

        return {
            status: "success",
            message: "Aktivite başarıyla oluşturuldu.",
        };
    } catch (error) {
        console.error("ActivityApiService -> createActivity: ", error);
        return { status: "error", message: "Aktivite oluşturma başarısız." };
    }
}