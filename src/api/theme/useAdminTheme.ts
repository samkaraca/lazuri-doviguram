import { apiAdmin } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminTheme = ({ themeSlug }: { themeSlug: string }) => {
    return useQuery({
        queryKey: ["themes", themeSlug],
        queryFn: async () => {
            const { data } = await apiAdmin.get(`/themes/${themeSlug}`);
            return data as ApiResponse;
        },
        enabled: !!themeSlug,
    });
};