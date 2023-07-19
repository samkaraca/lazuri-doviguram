import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = ThemeReposityImplementation.getInstance();

  if (req.method === "PUT") {
    const { theme, lesson, activity } = req.query as {
      theme: string;
      lesson: string;
      activity: string;
    };
    const { type } = req.body;

    if (type === "saveActivity") {
      const DBResponse = await themeRepo.saveActivity(
        theme,
        lesson,
        activity,
        req.body.activity
      );
      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
