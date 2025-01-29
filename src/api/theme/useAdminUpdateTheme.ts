import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminUpdateTheme = () => {
    return useMutation({
        mutationFn: async ({
            oldThemeSlug,
            theme: {
                slug,
                title,
                explanation,
                image,
                youtubeVideoUrl,
            }
        }: {
            oldThemeSlug: string;
            theme: {
                slug: string;
                title: string;
                explanation: string;
                image?: string | null;
                youtubeVideoUrl?: string | null;
            };
        }) => {
            const payload = {
                slug,
                title,
                explanation,
                image,
                youtubeVideoUrl,
            };

            const { data } = await apiAdmin.put(`/themes/${oldThemeSlug}`, payload);
            return data as ApiResponse;
        },
    });
};
