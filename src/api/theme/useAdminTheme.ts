import { apiAdmin } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import ITheme from "@/lib/theme/theme";

export const useAdminTheme = ({ themeSlug }: { themeSlug: string }) => {
    return useQuery({
        queryKey: [`themes/${themeSlug}`],
        queryFn: async () => {
            const { data } = await apiAdmin.get(`/themes/${themeSlug}`);
            return { ...data.data } as ITheme;
        },
        enabled: !!themeSlug,
        refetchOnMount: true,
        gcTime: 0,
    });
};