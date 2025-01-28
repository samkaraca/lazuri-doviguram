import { apiAdmin } from "@/lib/axios";
import ITheme from "@/lib/theme/theme";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminRelocateTheme = () => {
    return useMutation({
        mutationFn: async ({ oldThemeId, theme }: { oldThemeId: string; theme: ITheme }) => {
            const { data } = await apiAdmin.put(`/themes/${oldThemeId}?type=relocate-theme`, { theme });
            return data as ApiResponse;
        },
    });
};

