import { apiAdmin } from "@/lib/axios";

import ITheme from "@/lib/theme/theme";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminUpdateTheme = () => {
    return useMutation({
        mutationFn: async ({
            theme,
        }: {
            theme: Pick<ITheme, "id" | "explanation" | "image" | "youtubeVideoUrl">;
        }) => {
            const { data } = await apiAdmin.put(`/themes/${theme.id}?type=save-theme`, theme);
            return data as ApiResponse;
        },
    });
};
