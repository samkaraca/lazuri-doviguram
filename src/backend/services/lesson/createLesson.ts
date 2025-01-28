import { Types } from "mongoose";
import { ApiResponse } from "@/api/api_response";
import ILesson from "@/lib/lesson/lesson";
import dbConnect from "@/backend/lib/db";
import { Lesson } from "@/backend/models/Theme";

export const createLesson = async ({
    themeId,
    lesson,
}: {
    themeId: string;
    lesson: ILesson;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const newLesson = new Lesson({
            _id: new Types.ObjectId(),
            themeId,
            title: lesson.title,
            explanation: lesson.explanation,
        });
        await newLesson.save();

        return {
            status: "success",
            message: "Yeni ders başarıyla oluşturuldu.",
        };
    } catch (error) {
        console.error("LessonApiService -> createLesson: ", error);
        return { status: "error", message: "Yeni ders oluşturma başarısız." };
    }
};