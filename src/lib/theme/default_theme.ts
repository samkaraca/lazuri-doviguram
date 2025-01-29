import { nanoid } from "nanoid";
import { slugifyLaz } from "../../utils/slugify_laz";
import ITheme from "./theme";

export const defaultTheme = (theme?: Partial<ITheme>) => {
  const id = nanoid(7);
  const title = "Yeni Tema"

  return {
    ...{
      title,
      explanation: "Tema açıklaması...",
      youtubeVideoUrl: "https://youtu.be/dlyQJ9fctfM",
      lessons: [],
      slug: slugifyLaz(title),
    },
    ...theme,
  } as ITheme;
};
