import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { createTheme } from "@/backend/services/theme/createTheme";
import { getThemeMetas } from "@/backend/services/theme/getThemeMetas";
import { getThemeIds } from "@/backend/services/theme/getThemeIds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "POST") {
    const repRes = await createTheme(req.body.theme);
    res.status(201).json(repRes);
  } else if (req.method === "GET") {
    const type = req.query.type;

    if (type === "path-names") {
      const repRes = await getThemeIds();
      res.status(200).json(repRes);
    } else if (type === "theme-metas") {
      const repRes = await getThemeMetas();
      res.status(200).json(repRes);
    } else {
      res.status(400).json({ status: "error", message: "Unsopported action" });
    }
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
