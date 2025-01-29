import { Types } from "mongoose";
import { ApiResponse } from "@/api/api_response";
import ILesson from "@/lib/lesson/lesson";
import dbConnect from "@/backend/lib/db";
import { Lesson, Theme } from "@/backend/models/Theme";

export const createLesson = async ({
    themeSlug,
    lesson,
}: {
    themeSlug: string;
    lesson: ILesson;
}): Promise<ApiResponse> => {
    try {
        await dbConnect();

        const theme = await Theme.findOne({ slug: themeSlug });
        if (!theme) {
            return {
                status: "error",
                message: "Tema bulunamadı.",
            };
        }

        const newLesson = new Lesson({
            _id: new Types.ObjectId(),
            themeId: theme._id,
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