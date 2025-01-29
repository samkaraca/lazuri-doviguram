import { apiAdmin } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUploadSound = () => {
    return useMutation({
        mutationFn: async (sound: File) => {
            // First, get the pre-signed URL
            const response = await apiAdmin.post('/sounds', null, {
                headers: {
                    'Content-Type': sound.type,
                }
            });

            const { presignedUrl, url } = response.data.data;

            // Then upload directly to S3
            await fetch(presignedUrl, {
                method: 'PUT',
                body: sound,
                headers: {
                    'Content-Type': sound.type,
                }
            });

            return {
                status: "success",
                message: "Sound uploaded successfully",
                data: { url }
            };
        },
    });
};
