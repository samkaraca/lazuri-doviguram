import { DBTheme } from "@/lib/types/db_types/db_theme";

export interface IThemeRepository {
  relocateTheme: (oldThemeId: string, theme: DBTheme) => Promise<any>;
  createTheme: (theme: DBTheme) => Promise<any>;
  saveTheme: (
    theme: Pick<DBTheme, "id" | "explanation" | "image" | "youtubeVideoUrl">
  ) => Promise<any>;
  deleteTheme: (themeId: string) => Promise<any>;
  getTheme: (themeId: string) => Promise<DBTheme>;
  getThemeId: (pathName: string) => Promise<string>;
  getThemeIds: () => Promise<string[]>;
  getThemeMetas: () => Promise<
    Pick<DBTheme, "id" | "title" | "image" | "lessons" | "createdAt">[]
  >;
}
