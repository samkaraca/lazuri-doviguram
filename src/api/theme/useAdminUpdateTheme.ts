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
                image?: File | null;
                youtubeVideoUrl?: string;
            };
        }) => {
            const form = new FormData();
            form.append("title", title);
            form.append("slug", slug);
            form.append("explanation", explanation);
            if (image instanceof File) {
                form.append("image", image);
            } else if (image === null) {
                form.append("image", 'null');
            }
            if (youtubeVideoUrl) form.append("youtubeVideoUrl", youtubeVideoUrl);

            const { data } = await apiAdmin.putForm(`/themes/${oldThemeSlug}`, form);
            return data as ApiResponse;
        },
    });
};
