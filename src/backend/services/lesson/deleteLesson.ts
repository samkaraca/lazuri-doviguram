import { Types } from "mongoose";
import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";
import { Lesson } from "@/backend/models/Theme";

export const deleteLesson = async ({
    lessonId,
}: {
    lessonId: string;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();
        await Lesson.deleteOne({ _id: new Types.ObjectId(lessonId) });
        return { status: "success", message: "Ders başarıyla silindi." };
    } catch (error) {
        console.error("LessonApiService -> deleteLesson: ", error);
        return { status: "error", message: "Ders silme başarısız." };
    }
};