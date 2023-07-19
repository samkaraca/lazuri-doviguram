import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = ThemeReposityImplementation.getInstance();

  if (req.method === "PUT") {
    let DBResponse;
    const { type } = req.body;

    if (type === "createNewTheme") {
      DBResponse = await themeRepo.createNewTheme();
      return res.status(200).send(DBResponse);
    } else if (type === "deleteTheme") {
      const { themeId } = req.body;
      DBResponse = await themeRepo.deleteTheme(themeId);
      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
