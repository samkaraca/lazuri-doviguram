import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { getTheme } from "@/backend/services/theme/getTheme";
import { updateTheme } from "@/backend/services/theme/updateTheme";
import { deleteTheme } from "@/backend/services/theme/deleteTheme";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const theme = req.query.theme as string;

  if (req.method === "GET") {
    const repRes = await getTheme(theme);
    res.status(200).json(repRes);
  } else if (req.method === "PUT") {
    const { title, slug, explanation, youtubeVideoUrl, image } = req.body;
    const repRes = await updateTheme({ themeSlug: theme, theme: { title, slug, explanation, youtubeVideoUrl, image } });
    res.status(200).json(repRes);
  } else if (req.method === "DELETE") {
    const repRes = await deleteTheme({ slug: theme });
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsupported request method" });
  }
}
