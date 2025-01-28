import { apiAdmin } from "@/lib/axios";
import { ApiResponse } from "../api_response";
import { useMutation } from "@tanstack/react-query";

export const useAdminDeleteLesson = () => {
    return useMutation({
        mutationFn: async ({ themeId, lessonId }: { themeId: string; lessonId: string }) => {
            const { data } = await apiAdmin.delete(`/themes/${themeId}/lessons/${lessonId}`);
            return data as ApiResponse;
        },
    });
};
