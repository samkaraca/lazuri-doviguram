import { apiAdmin } from "@/lib/axios";
import ITheme from "@/lib/theme/theme";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminCreateTheme = () => {
    return useMutation({
        mutationFn: async ({ theme }: { theme: ITheme }) => {
            const { data } = await apiAdmin.post("/themes", { theme });
            return data as ApiResponse;
        },
    });
};
