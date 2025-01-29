import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { generatePresignedUrl } from "@/backend/lib/s3";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    if (req.method === "POST") {
        try {
            const contentType = req.headers['content-type'];
            if (!contentType || !contentType.startsWith('image/')) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid content type. Must be an image file.",
                });
            }

            const { presignedUrl, fileUrl } = await generatePresignedUrl('image', contentType);

            res.status(200).json({
                status: "success",
                message: "Pre-signed URL generated successfully",
                data: { presignedUrl, url: fileUrl }
            });
        } catch (error) {
            console.error("Error generating pre-signed URL:", error);
            res.status(500).json({
                status: "error",
                message: "Failed to generate pre-signed URL"
            });
        }
    } else {
        res.status(405).json({
            status: "error",
            message: "Unsupported request method"
        });
    }
}
