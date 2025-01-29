import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUploadSound = () => {
    return useMutation({
        mutationFn: async (sound: File) => {
            const formData = new FormData();
            formData.append('sound', sound);

            const response = await apiAdmin.post('/sounds', formData);
            return response.data;
        },
    });
};
