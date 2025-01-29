import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (image: File) => {
            const formData = new FormData();
            formData.append('image', image);

            const response = await apiAdmin.post('/images', formData);
            return response.data;
        },
    });
}; 