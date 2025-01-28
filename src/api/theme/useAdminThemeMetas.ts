import { BackendThemeService } from "@/backend/services/theme_service";
import { apiAdmin } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useAdminThemeMetas = () => {
    return useQuery({
        queryKey: ["admin-theme-metas"],
        queryFn: async () => {
            const { data } = await apiAdmin.get("/themes?type=theme-metas");
            const res = data as Awaited<
                ReturnType<BackendThemeService["getThemeMetas"]>
            >;
            return res.data;
        },
    });
};