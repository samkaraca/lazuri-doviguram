import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";
import { apiAdmin } from "@/lib/axios";
import IActivity from "@/lib/activity/activity";

export const useAdminUpdateActivity = () => {
    return useMutation({
        mutationFn: async ({ themeId, lessonId, activity }: { themeId: string; lessonId: string; activity: IActivity }) => {
            const { data } = await apiAdmin.put(`/themes/${themeId}/lessons/${lessonId}/activities/${activity._id}`, { activity });
            return data as ApiResponse;
        },
    });
}