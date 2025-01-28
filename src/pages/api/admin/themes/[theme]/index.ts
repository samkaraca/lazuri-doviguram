import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/api/api_response";
import { getTheme } from "@/backend/services/theme/getTheme";
import { updateTheme } from "@/backend/services/theme/updateTheme";
import { relocateTheme } from "@/backend/services/theme/relocateTheme";
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
    const type = req.query.type;

    if (type === "save-theme") {
      const repRes = await updateTheme(req.body.theme);
      res.status(200).json(repRes);
    } else if (type === "relocate-theme") {
      const repRes = await relocateTheme(
        theme,
        req.body.theme
      );
      res.status(200).json(repRes);
    } else {
      res.status(400).json({ status: "error", message: "Unsopported action" });
    }
  } else if (req.method === "DELETE") {
    const repRes = await deleteTheme(theme);
    res.status(200).json(repRes);
  } else {
    res
      .status(405)
      .json({ status: "error", message: "Unsopported request method" });
  }
}
