import ITheme from "../lib/theme/theme";
import { ApiResponse } from "./api_response";
import { BackendThemeService } from "../backend/services/theme_service";

export class AdminThemeApi {
  fetchTheme = async (pathName: string) => {
    const resObj = await fetch(`/api/admin/themes/${pathName}`);
    const res = await (resObj.json() as ReturnType<
      BackendThemeService["getTheme"]
    >);
    if (res.status === "success" && res.data) {
      return res.data;
    }
    return undefined;
  };

  saveTheme = async (
    theme: Pick<ITheme, "id" | "explanation" | "image" | "youtubeVideoUrl">
  ) => {
    const resObj = await fetch(
      `/api/admin/themes/${theme.id}?type=save-theme`,
      {
        method: "PUT",
        body: JSON.stringify({
          theme,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (await resObj.json()) as ApiResponse;
  };

  relocateTheme = async (oldThemeId: string, theme: ITheme) => {
    const resObj = await fetch(
      `/api/admin/themes/${oldThemeId}?type=relocate-theme`,
      {
        method: "PUT",
        body: JSON.stringify({
          theme,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (await resObj.json()) as ApiResponse;
  };

  createTheme = async (theme: ITheme) => {
    const resObj = await fetch(`/api/admin/themes`, {
      method: "POST",
      body: JSON.stringify({
        theme,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await resObj.json()) as ApiResponse;
  };

  deleteTheme = async (themeId: string) => {
    const resObj = await fetch(`/api/admin/themes/${themeId}`, {
      method: "DELETE",
    });
    return (await resObj.json()) as ApiResponse;
  };
}
