import { IThemeRepository } from "@/lib/repositories/theme/theme_repository";
import ITheme from "@/lib/theme/theme";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import { ApiResponse } from "@/lib/types/api_response";
import {
  convertThemeDBToUser,
  convertThemeUserToDB,
} from "../api_tools_service";

export default class ThemeApiService {
  constructor(private readonly themeRepository: IThemeRepository) {}

  getThemeMetas = async (): Promise<ApiResponse<ThemeMetaDTO[]>> => {
    try {
      const rawMetas = await this.themeRepository.getThemeMetas();
      const themeMetas = rawMetas.map((meta) => {
        const lessons = meta.lessons.idOrder.map((lessonId: string) => {
          const { title } = meta.lessons[lessonId];
          return { id: lessonId, title };
        });
        return { ...meta, lessons };
      });
      return { status: "success", message: "", data: themeMetas };
    } catch (error) {
      console.error("ThemeApiService -> getThemeMetas: ", error);
      return { status: "error", message: "" };
    }
  };

  getThemeIds = async (): Promise<ApiResponse<string[]>> => {
    try {
      const pathNames = await this.themeRepository.getThemeIds();
      return { status: "success", message: "", data: pathNames };
    } catch (error) {
      console.error("ThemeApiService -> getThemeIds: ", error);
      return { status: "error", message: "" };
    }
  };

  getTheme = async (themeId: string): Promise<ApiResponse<ITheme>> => {
    try {
      const dbThemeData = await this.themeRepository.getTheme(themeId);
      return {
        status: "success",
        message: "",
        data: convertThemeDBToUser(dbThemeData),
      };
    } catch (error) {
      console.error("ThemeApiService -> getTheme: ", error);
      return { status: "error", message: "" };
    }
  };

  deleteTheme = async (themeId: string) => {
    try {
      await this.themeRepository.deleteTheme(themeId);
      return { status: "success", message: "Tema başarıyla silindi." };
    } catch (error) {
      console.error("ThemeApiService -> deleteTheme: ", error);
      return { status: "error", message: "Tema silme başarısız." };
    }
  };

  relocateTheme = async (
    oldThemeId: string,
    theme: ITheme
  ): Promise<ApiResponse> => {
    try {
      await this.themeRepository.relocateTheme(
        oldThemeId,
        convertThemeUserToDB(theme)
      );
      return { status: "success", message: "Tema başarıyla kaydedildi." };
    } catch (error) {
      console.error("ThemeApiService -> relocateTheme: ", error);
      return { status: "error", message: "Tema kaydetme başarısız" };
    }
  };

  createTheme = async (theme: ITheme) => {
    try {
      const themeToCreate = { ...theme, pk: "theme" } as any;
      await this.themeRepository.createTheme(
        convertThemeUserToDB(themeToCreate)
      );
      return {
        status: "success",
        message: "Tema başarıyla oluşturuldu.",
      };
    } catch (error) {
      console.error("ThemeApiService -> createTheme: ", error);
      return { status: "error", message: "Tema oluşturma başarısız." };
    }
  };

  saveTheme = async (
    theme: Pick<ITheme, "id" | "explanation" | "image" | "youtubeVideoUrl">
  ) => {
    try {
      await this.themeRepository.saveTheme(theme);
      return {
        status: "success",
        message: "Tema başarıyla güncellendi.",
      };
    } catch (error) {
      console.error("ThemeApiService -> saveTheme: ", error);
      return { status: "error", message: "Tema güncelleme başarısız." };
    }
  };
}
