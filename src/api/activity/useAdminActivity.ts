import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";
import { apiAdmin } from "@/lib/axios";

export const useAdminActivity = ({ themeId, lessonId, activityId }: { themeId: string; lessonId: string; activityId: string }) => {
    return useQuery({
        queryKey: ["admin-activity", themeId, lessonId, activityId],
        queryFn: async () => {
            const { data } = await apiAdmin.get(`/themes/${themeId}/lessons/${lessonId}/activities/${activityId}`);
            return data as ApiResponse;
        },
        enabled: !!themeId && !!lessonId && !!activityId,
    });
}