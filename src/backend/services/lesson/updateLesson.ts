import { Lesson } from "@/backend/models/Theme";
import ILesson from "@/lib/lesson/lesson";
import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";

export const updateLesson = async ({
    lesson,
}: {
    lesson: Omit<ILesson, "activities">;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const lessonToSave = { ...lesson } as any;
        delete lessonToSave.id;

        await Lesson.findOneAndUpdate({ _id: lesson.id }, { $set: lessonToSave });

        return { status: "success", message: "Ders başarıyla güncellendi." };
    } catch (error) {
        console.error("LessonApiService -> saveLesson: ", error);
        return { status: "error", message: "Ders güncelleme başarısız." };
    }
};