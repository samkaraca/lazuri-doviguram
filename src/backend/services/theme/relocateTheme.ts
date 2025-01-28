import { ApiResponse } from "@/api/api_response";
import ITheme from "@/lib/theme/theme";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";

export const relocateTheme = async (
    oldThemeId: string,
    theme: ITheme
): Promise<ApiResponse> => {
    try {
        await dbConnect();
        await Theme.updateOne({ _id: new Types.ObjectId(oldThemeId) }, {
            $set: {
                title: theme.title,
                explanation: theme.explanation,
                image: theme.image,
                youtubeVideoUrl: theme.youtubeVideoUrl,
            }
        });
        return { status: "success", message: "Tema başarıyla kaydedildi." };
    } catch (error) {
        console.error("ThemeApiService -> relocateTheme: ", error);
        return { status: "error", message: "Tema kaydetme başarısız" };
    }
};