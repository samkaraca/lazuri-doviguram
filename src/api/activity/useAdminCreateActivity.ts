import { apiAdmin } from "@/lib/axios";
import { ApiResponse } from "../api_response";
import { useMutation } from "@tanstack/react-query";
import IActivity from "@/lib/activity/activity";

export const useAdminCreateActivity = () => {
    return useMutation({
        mutationFn: async ({ themeId, lessonId, activity }: { themeId: string; lessonId: string; activity: IActivity }) => {
            const { data } = await apiAdmin.post(`/themes/${themeId}/lessons/${lessonId}/activities`, { activity });
            return data as ApiResponse;
        },
    });
};