import { ApiResponse } from "@/api/api_response";
import ITheme from "@/lib/theme/theme";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";
import { slugifyLaz } from "@/utils/slugify_laz";

export const createTheme = async (theme: ITheme): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const newTheme = new Theme({
            _id: new Types.ObjectId(),
            title: theme.title,
            explanation: theme.explanation,
            image: theme.image,
            youtubeVideoUrl: theme.youtubeVideoUrl,
            slug: slugifyLaz(theme.title),
            createdAt: theme.createdAt,
        });
        await newTheme.save();

        return {
            status: "success",
            message: "Tema başarıyla oluşturuldu.",
        };
    } catch (error) {
        console.error("ThemeApiService -> createTheme: ", error);
        return { status: "error", message: "Tema oluşturma başarısız." };
    }
};