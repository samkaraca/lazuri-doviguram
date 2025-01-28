import { ApiResponse } from "@/api/api_response";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";

export const getThemeMetas = async (): Promise<ApiResponse<ThemeMetaDTO[]>> => {
    try {
        await dbConnect();
        const themes = await Theme.aggregate([
            {
                $lookup: {
                    from: "lessons",
                    localField: "_id",
                    foreignField: "themeId",
                    as: "lessons",
                },
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    title: 1,
                    image: 1,
                    createdAt: 1,
                    lessons: 1,
                },
            },
        ]);

        return {
            status: "success", message: "", data: themes.map(theme => ({
                ...theme,
                id: theme.id.toString(),
                lessons: theme.lessons.map((lesson: any) => ({
                    id: lesson._id.toString(),
                    title: lesson.title,
                })),
            }))
        };
    } catch (error) {
        console.error("ThemeApiService -> getThemeMetas: ", error);
        return { status: "error", message: "" };
    }
};