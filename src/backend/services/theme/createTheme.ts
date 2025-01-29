import { ApiResponse } from "@/api/api_response";
import ITheme from "@/lib/theme/theme";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";
import { slugifyLaz } from "@/utils/slugify_laz";
import { nanoid } from "nanoid";

export const createTheme = async (theme: ITheme): Promise<ApiResponse> => {
    try {
        await dbConnect();
        const existingTheme = await Theme.findOne({ slug: slugifyLaz(theme.title) });

        if (existingTheme) {
            const uniqueId = nanoid(3);
            theme.title += `#${uniqueId}`;
            theme.slug = slugifyLaz(theme.title);
        }

        const newTheme = new Theme({
            _id: new Types.ObjectId(),
            title: theme.title,
            explanation: theme.explanation,
            image: theme.image,
            youtubeVideoUrl: theme.youtubeVideoUrl,
            slug: theme.slug,
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