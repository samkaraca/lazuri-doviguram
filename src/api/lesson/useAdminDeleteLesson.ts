import { apiAdmin } from "@/lib/axios";
import { ApiResponse } from "../api_response";
import { useMutation } from "@tanstack/react-query";

export const useAdminDeleteLesson = () => {
    return useMutation({
        mutationFn: async ({ themeSlug, lessonId }: { themeSlug: string; lessonId: string }) => {
            const { data } = await apiAdmin.delete(`/themes/${themeSlug}/lessons/${lessonId}`);
            return data as ApiResponse;
        },
    });
};
