import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../api_response";

export const useAdminLogin = () => {
    return useMutation({
        mutationFn: async ({ password }: { password: string }) => {
            const { data } = await apiAdmin.post("/login", {
                password,
            });
            return data as ApiResponse;
        },
    });
};
