import { ApiResponse } from "@/api/api_response";
import { Files, Fields } from "formidable";
import { uploadSoundFile } from "@/backend/lib/s3";
import fs from "fs/promises";

/**
 * Handles the upload of sound files.
 * @param {Files} params.files - The files to upload (sound)
 * @param {Fields} params.fields - Additional fields if needed
 */
export const uploadSound = async (
    {
        files,
        fields,
    }: {
        files: Files;
        fields: Fields;
    }): Promise<ApiResponse> => {
    try {
        const soundFile = files.sound?.[0];
        if (!soundFile) {
            return { status: "error", message: "No sound file uploaded." };
        }

        // Determine the file format
        const mimeType = soundFile.mimetype;
        if (!mimeType) {
            return { status: "error", message: "Could not determine the sound file format." };
        }

        const supportedFormats = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
        if (!supportedFormats.includes(mimeType)) {
            return { status: "error", message: "Unsupported sound format." };
        }

        const format = mimeType.split('/')[1]; // Extract format from MIME type

        const soundBuffer = await fs.readFile(soundFile.filepath);

        // Clean up the temp file
        await fs.unlink(soundFile.filepath);

        const soundUrl = await uploadSoundFile({
            soundBuffer,
            format,
        });

        return {
            status: "success",
            message: "Sound uploaded successfully.",
            data: { url: soundUrl },
        };
    } catch (error) {
        console.error("uploadSound: ", error);
        return { status: "error", message: "Sound upload failed." };
    }
};
