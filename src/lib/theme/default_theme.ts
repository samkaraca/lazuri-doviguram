import { nanoid } from "nanoid";
import { slugifyLaz } from "../utils/slugify_laz";
import ITheme from "./theme";

export const defaultTheme = (theme?: Partial<ITheme>) => {
  const id = nanoid(7);

  return {
    ...{
      id,
      title: "Yeni Tema",
      explanation: "Tema açıklaması...",
      image: "default.jpg",
      youtubeVideoUrl: "https://youtu.be/dlyQJ9fctfM",
      lessons: [],
      pathName: slugifyLaz(id),
      createdAt: Date.now(),
    },
    ...theme,
  } as ITheme;
};
