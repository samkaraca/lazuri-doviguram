import { ApiResponse } from "@/api/api_response";
import { Files, Fields } from "formidable";
import { uploadImage as uploadImageFile } from "@/backend/lib/s3";
import fs from "fs/promises";

/**
 * Handles the upload of image files.
 * @param {Files} params.files - The files to upload (image)
 * @param {Fields} params.fields - Additional fields if needed
 */
export const uploadImage = async (
    {
        files,
        fields,
    }: {
        files: Files;
        fields: Fields;
    }): Promise<ApiResponse> => {
    try {
        const imageFile = files.image?.[0];
        if (!imageFile) {
            return { status: "error", message: "No image file uploaded." };
        }

        const imageBuffer = await fs.readFile(imageFile.filepath);

        // Clean up the temp file
        await fs.unlink(imageFile.filepath);

        const imageUrl = await uploadImageFile({
            imageBuffer,
            format: 'jpg', // Assuming jpg format for simplicity
        });

        return {
            status: "success",
            message: "Image uploaded successfully.",
            data: { url: imageUrl },
        };
    } catch (error) {
        console.error("uploadImage: ", error);
        return { status: "error", message: "Image upload failed." };
    }
}; 