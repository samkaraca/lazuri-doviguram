import { ThemeMetaDTO } from "../dtos/theme_meta_dto";
import { Theme } from "../entities/learning_unit";
import { StatusResponse } from "./status_response";

export interface ThemeRepository {
  getThemePathNames: () => Promise<StatusResponse<string[]>>;
  getThemeMetas: () => Promise<StatusResponse<ThemeMetaDTO[]>>;
  getThemeData: (pathName: string) => Promise<StatusResponse<Theme>>;
  createNewLesson: (themeId: string) => Promise<Record<string, any>>;
  saveTheme: ({
    themeId,
    title,
    image,
    youtubeVideoUrl,
    explanation,
  }: {
    themeId: string;
    title: string;
    image: string;
    youtubeVideoUrl: string;
    explanation: string;
  }) => Promise<StatusResponse<{ pathName: string }>>;
  createNewTheme: () => Promise<StatusResponse>;
  deleteTheme: (themeId: string) => Promise<StatusResponse>;
}
