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
                    slug: 1,
                    title: 1,
                    image: 1,
                    createdAt: 1,
                    lessons: 1,
                },
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ]);

        const sortedThemes = themes.map(theme => ({
            ...theme,
            lessons: theme.lessons.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        }));

        return {
            status: "success", message: "", data: sortedThemes
        };
    } catch (error) {
        console.error("ThemeApiService -> getThemeMetas: ", error);
        return { status: "error", message: "" };
    }
};