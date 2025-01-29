import { ApiResponse } from "@/api/api_response";
import ITheme from "@/lib/theme/theme";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";
import { Fields } from "formidable";
import { optimizeFixedSizeImage } from "@/backend/lib/optimizeFixedSizeImage";
import { uploadImage } from "@/backend/lib/s3";
import fs from "fs/promises";

/**
 * @param {string} params.themeSlug - The slug of the theme to update
 * @param {Fields} params.fields - The fields to update (title, slug, explanation, youtubeVideoUrl, imageUrl)
 */
export const updateTheme = async (
    {
        themeSlug,
        theme: {
            title,
            slug,
            explanation,
            youtubeVideoUrl,
            image,
        }
    }: {
        themeSlug: string;
        theme: {
            title: string;
            slug: string;
            explanation: string;
            youtubeVideoUrl: string;
            image: string;
        }
    }): Promise<ApiResponse> => {
    try {
        await dbConnect();

        const theme = await Theme.findOne({ slug: themeSlug });
        if (!theme) {
            return { status: "error", message: "Tema bulunamadı" };
        }

        const existingTheme = await Theme.findOne({ slug: slug });
        if (existingTheme && existingTheme._id.toString() !== theme._id.toString()) {
            return { status: "error", message: "Bu isimde bir tema zaten mevcut." };
        }

        const updateData: Partial<ITheme> = {};

        // Handle text fields
        if (title) updateData.title = title;
        if (slug) updateData.slug = slug;
        if (explanation) updateData.explanation = explanation;
        if (youtubeVideoUrl || youtubeVideoUrl === null) updateData.youtubeVideoUrl = youtubeVideoUrl;
        if (image || image === null) updateData.image = image;

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