import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminDeleteTheme = () => {
    return useMutation({
        mutationFn: async ({ themeId }: { themeId: string }) => {
            const { data } = await apiAdmin.delete(`/themes/${themeId}`);
            return data as ApiResponse;
        },
    });
};
