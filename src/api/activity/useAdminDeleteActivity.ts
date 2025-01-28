import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";
import { apiAdmin } from "@/lib/axios";

export const useAdminDeleteActivity = () => {
    return useMutation({
        mutationFn: async ({ themeId, lessonId, activityId }: { themeId: string; lessonId: string; activityId: string }) => {
            const { data } = await apiAdmin.delete(`/themes/${themeId}/lessons/${lessonId}/activities/${activityId}`);
            return data as ApiResponse;
        },
    });
};