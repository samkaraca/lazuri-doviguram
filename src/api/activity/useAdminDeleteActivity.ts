import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";
import { apiAdmin } from "@/lib/axios";

export const useAdminDeleteActivity = () => {
    return useMutation({
        mutationFn: async ({ themeSlug, lessonId, activityId }: { themeSlug: string; lessonId: string; activityId: string }) => {
            const { data } = await apiAdmin.delete(`/themes/${themeSlug}/lessons/${lessonId}/activities/${activityId}`);
            return data as ApiResponse;
        },
    });
};