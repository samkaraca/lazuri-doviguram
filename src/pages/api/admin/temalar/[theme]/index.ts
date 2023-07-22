import type { NextApiRequest, NextApiResponse } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const themeRepo = new ThemeReposityImplementation();

  if (req.method === "PUT") {
    let DBResponse;
    const theme = req.query.theme as string;
    const { type } = req.body;

    if (type === "saveTheme") {
      const { title, explanation, image, youtubeVideoUrl } = req.body;
      DBResponse = await themeRepo.saveTheme({
        themeId: theme,
        title,
        explanation,
        image,
        youtubeVideoUrl,
      });

      return res.status(200).send(DBResponse);
    } else if (type === "createLesson") {
      DBResponse = await themeRepo.createNewLesson(theme);

      return res.status(200).send(DBResponse);
    }

    return res.status(501).json({ error: "Unsopported action" });
  } else if (req.method === "DELETE") {
    const theme = req.query.theme as string;
    const result = await themeRepo.deleteTheme(theme);
    return res.status(200).json(result);
  } else if (req.method === "GET") {
    const theme = req.query.theme as string;
    const themeData = await themeRepo.getThemeData(theme);
    return res.status(200).json(themeData);
  } else if (req.method === "POST") {
    const { type } = req.body;
    const themeId = req.query.theme;

    if (type === "publishChanges") {
      try {
        console.debug("atıyorum---", Date.now());
        await res.revalidate(`/temalar/${themeId}`);
        console.debug("topluyorum---", Date.now());
        //await res.revalidate("/");
        return res.status(200).send({
          status: "success",
          message: "Değişiklikler başarıyla yayınlandı.",
        });
      } catch (error) {
        console.error(
          `/api/admin/temalar/${themeId} -> POST -> publishChanges ->`,
          error
        );
        return res.status(200).send({
          status: "error",
          message: "Değişikliklerin yayınlanması başarısız.",
        });
      }
    }
  }

  return res.status(501).json({ error: "Unsopported request method" });
}

export default handler;
