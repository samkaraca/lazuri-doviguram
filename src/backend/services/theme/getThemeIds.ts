import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";

export const getThemeIds = async (): Promise<ApiResponse<string[]>> => {
    try {
        await dbConnect();
        const themes = await Theme.find({});

        return { status: "success", message: "", data: themes.map(theme => theme._id.toString()) };
    } catch (error) {
        console.error("ThemeApiService -> getThemeIds: ", error);
        return { status: "error", message: "" };
    }
};