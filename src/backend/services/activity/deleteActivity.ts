import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";
import { Activity } from "@/backend/models/Theme";

export const deleteActivity = async ({
    activityId,
}: {
    activityId: string;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const mongooseActivity = await Activity.deleteOne({ _id: activityId });
        console.log("mongooseActivity", mongooseActivity);

        return { status: "success", message: "Aktivite başarıyla silindi." };
    } catch (error) {
        console.error("ActivityApiService -> deleteActivity: ", error);
        return { status: "error", message: "Aktivite silme başarısız." };
    }
}