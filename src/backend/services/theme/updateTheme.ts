import { ApiResponse } from "@/api/api_response";
import ITheme from "@/lib/theme/theme";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";

export const updateTheme = async (
    theme: Pick<ITheme, "id" | "explanation" | "image" | "youtubeVideoUrl">
): Promise<ApiResponse> => {
    try {
        await dbConnect();
        await Theme.updateOne({ _id: new Types.ObjectId(theme.id) }, {
            explanation: theme.explanation,
            image: theme.image,
            youtubeVideoUrl: theme.youtubeVideoUrl,
        });

        return {
            status: "success",
            message: "Tema başarıyla güncellendi.",
        };
    } catch (error) {
        console.error("ThemeApiService -> saveTheme: ", error);
        return { status: "error", message: "Tema güncelleme başarısız." };
    }
};