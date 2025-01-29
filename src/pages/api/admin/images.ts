import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { parseFormidableForm } from "@/backend/lib/parseFormidableForm";
import { uploadImage } from "@/backend/services/uploadImage";

export const config = {
    api: {
        bodyParser: false, // Disable the default body parser for multipart form data
        sizeLimit: '100mb',
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    if (req.method === "POST") {
        const { fields, files } = await parseFormidableForm(req);
        const repRes = await uploadImage({ files, fields });
        res.status(200).json(repRes);
    } else {
        res
            .status(405)
            .json({ status: "error", message: "Unsupported request method" });
    }
}
