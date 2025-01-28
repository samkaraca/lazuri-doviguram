import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";

export const deleteTheme = async (themeId: string): Promise<ApiResponse> => {
    try {
        await dbConnect();
        await Theme.deleteOne({ _id: new Types.ObjectId(themeId) });
        return { status: "success", message: "Tema başarıyla silindi." };
    } catch (error) {
        console.error("ThemeApiService -> deleteTheme: ", error);
        return { status: "error", message: "Tema silme başarısız." };
    }
};