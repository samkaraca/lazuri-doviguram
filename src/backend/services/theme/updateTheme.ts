import { ApiResponse } from "@/api/api_response";
import ITheme from "@/lib/theme/theme";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";
import { Fields, Files } from "formidable";
import { optimizeFixedSizeImage } from "@/backend/lib/optimizeFixedSizeImage";
import { uploadImage } from "@/backend/lib/s3";
import fs from "fs/promises";

/**
 * @param {string} params.themeSlug - The slug of the theme to update
 * @param {Files} params.files - The files to update (image)
 * @param {Fields} params.fields - The fields to update (title, slug, explanation, youtubeVideoUrl)
 */
export const updateTheme = async (
    {
        themeSlug,
        files,
        fields,
    }: {
        themeSlug: string;
        files: Files;
        fields: Fields;
    }): Promise<ApiResponse> => {
    try {
        await dbConnect();

        const theme = await Theme.findOne({ slug: themeSlug });
        if (!theme) {
            return { status: "error", message: "Tema bulunamadı" };
        }

        const existingTheme = await Theme.findOne({ slug: fields.slug?.[0] });
        if (existingTheme && existingTheme._id.toString() !== theme._id.toString()) {
            return { status: "error", message: "Bu isimde bir tema zaten mevcut." };
        }

        const updateData: Partial<ITheme> = {};

        // Handle text fields
        if (fields.title?.[0]) updateData.title = fields.title[0];
        if (fields.slug?.[0]) updateData.slug = fields.slug[0];
        if (fields.explanation?.[0]) updateData.explanation = fields.explanation[0];
        if (fields.youtubeVideoUrl?.[0]) updateData.youtubeVideoUrl = fields.youtubeVideoUrl[0];

        // Handle image field - check if image should be removed
        if (fields.image?.[0] === 'null') {
            updateData.image = null;
        } else if (files.image?.[0]) {
            const imageFile = files.image[0];
            const imageBuffer = await fs.readFile(imageFile.filepath);

            // Clean up the temp file
            await fs.unlink(imageFile.filepath);

            const optimizationResult = await optimizeFixedSizeImage({
                image: imageBuffer,
                width: 800,
            });

            if (!optimizationResult.data) {
                return {
                    status: "error",
                    message: optimizationResult.error
                };
            }

            const imageUrl = await uploadImage({
                imageBuffer: optimizationResult.data.imageBuffer,
                format: 'webp'
            });
            updateData.image = imageUrl;
        }

        await Theme.updateOne(
            { slug: themeSlug },
            updateData
        );

        return {
            status: "success",
            message: "Tema başarıyla güncellendi.",
        };
    } catch (error) {
        console.error("ThemeApiService -> updateTheme: ", error);
        return { status: "error", message: "Tema güncelleme başarısız." };
    }
};