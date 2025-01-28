import { apiAdmin } from "@/lib/axios";
import { ApiResponse } from "../api_response";
import { useMutation } from "@tanstack/react-query";
import ILesson from "@/lib/lesson/lesson";

export const useAdminUpdateLesson = () => {
    return useMutation({
        mutationFn: async ({ themeId, lesson }: { themeId: string; lesson: Omit<ILesson, "activities"> }) => {
            const { data } = await apiAdmin.put(`/themes/${themeId}/lessons/${lesson.id}`, { lesson });
            return data as ApiResponse;
        },
    });
};