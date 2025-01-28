import { apiAdmin } from "@/lib/axios";
import { ApiResponse } from "../api_response";
import { useMutation } from "@tanstack/react-query";
import ILesson from "@/lib/lesson/lesson";

export const useAdminCreateLesson = () => {
    return useMutation({
        mutationFn: async ({ themeId, lesson }: { themeId: string; lesson: ILesson }) => {
            const { data } = await apiAdmin.post(`/themes/${themeId}/lessons`, { lesson });
            return data as ApiResponse;
        },
    });
};
