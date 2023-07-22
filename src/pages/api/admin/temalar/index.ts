import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const themeRepo = new ThemeReposityImplementation();

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
  } else if (req.method === "GET") {
    const result = await themeRepo.getThemeMetas();
    if (result.status === "success" && result.data) {
      return res.status(200).json(result.data);
    }
    return res.status(200).json([]);
  } else if (req.method === "POST") {
    const { type } = req.body;

    if (type === "publishChanges") {
      try {
        await res.revalidate("/temalar/[theme]");
        return res.status(200).send({
          status: "success",
          message: "Değişiklikler başarıyla yayınlandı.",
        });
      } catch (error) {
        console.error(error);
        return res.status(200).send({
          status: "error",
          message: "Değişikliklerin yayınlanması başarısız.",
        });
      }
    }

    return res.status(501).json({ error: "Unsopported action" });
  }

  return res.status(501).json({ error: "Unsopported request method" });
}
