import { ThemeMetaDTO } from "../dtos/theme_meta_dto";
import { Theme } from "../entities/learning_unit";
import { StatusResponse } from "./status_response";

export interface ThemeRepository {
  getThemeIds: () => Promise<StatusResponse<string[]>>;
  getThemeMetas: () => Promise<StatusResponse<ThemeMetaDTO[]>>;
  getThemeData(themePath: string): Promise<Theme>;
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
  }) => Promise<StatusResponse>;
  createNewTheme: () => Promise<StatusResponse>;
  deleteTheme: (themeId: string) => Promise<StatusResponse>;
}
