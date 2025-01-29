import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";

export const deleteTheme = async ({ slug }: { slug: string }): Promise<ApiResponse> => {
    try {
        await dbConnect();
        await Theme.deleteOne({ slug });
        return { status: "success", message: "Tema başarıyla silindi." };
    } catch (error) {
        console.error("ThemeApiService -> deleteTheme: ", error);
        return { status: "error", message: "Tema silme başarısız." };
    }
};