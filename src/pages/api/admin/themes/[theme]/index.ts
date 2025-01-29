import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { getTheme } from "@/backend/services/theme/getTheme";
import { updateTheme } from "@/backend/services/theme/updateTheme";
import { deleteTheme } from "@/backend/services/theme/deleteTheme";
import { parseFormidableForm } from "@/backend/lib/parseFormidableForm";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser for multipart form data
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const theme = req.query.theme as string;

  if (req.method === "GET") {
    const repRes = await getTheme(theme);
    res.status(200).json(repRes);
  } else if (req.method === "PUT") {
    const { fields, files } = await parseFormidableForm(req);
    const repRes = await updateTheme({ themeSlug: theme, fields, files });
    res.status(200).json(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await deleteTheme({ slug: theme });
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
