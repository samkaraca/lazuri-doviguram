import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (image: File) => {
            // First, get the pre-signed URL
            const response = await apiAdmin.post('/images', null, {
                headers: {
                    'Content-Type': image.type,
                }
            });

            const { presignedUrl, url } = response.data.data;

            // Then upload directly to S3
            await fetch(presignedUrl, {
                method: 'PUT',
                body: image,
                headers: {
                    'Content-Type': image.type,
                }
            });

            return {
                status: "success",
                message: "Image uploaded successfully",
                data: { url }
            };
        },
    });
}; 