import { Activity } from "../activity/activity";
import { Lesson } from "../lesson/lesson";
import { Theme } from "../theme/theme";
import { ApiResponse } from "../types/api_response";
import ApiService from "./theme_api_service";

export default class ThemeAdminService {
  deleteActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string
  ) => {
    const resObj = await fetch(
      `/api/admin/temalar/${themeId}/${lessonId}/${activityId}`,
      {
        method: "DELETE",
      }
    );
    return (await resObj.json()) as ApiResponse;
  };

  createActivity = async (
    themeId: string,
    lessonId: string,
    activity: Activity
  ) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}/${lessonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "createActivity",
        activity,
      }),
    });
    return (await resObj.json()) as ApiResponse;
  };

  deleteLesson = async (themeId: string, lessonId: string) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}/${lessonId}`, {
      method: "DELETE",
    });
    return (await resObj.json()) as ApiResponse;
  };

  createLesson = async (themeId: string, lesson: Lesson) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "createLesson",
        lesson,
      }),
    });
    return (await resObj.json()) as ApiResponse;
  };

  saveLesson = async (themeId: string, lesson: Omit<Lesson, "activities">) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "saveLesson",
        lesson,
      }),
    });
    return (await resObj.json()) as ApiResponse;
  };

  fetchTheme = async (pathName: string) => {
    const resObj = await fetch(`/api/admin/temalar/${pathName}`);
    const res = await (resObj.json() as ReturnType<ApiService["getTheme"]>);
    if (res.status === "success" && res.data) {
      return Theme.from(res.data);
    }
    return undefined;
  };

  saveTheme = async (
    theme: Pick<Theme, "id" | "explanation" | "image" | "youtubeVideoUrl">
  ) => {
    const resObj = await fetch(`/api/admin/temalar`, {
      method: "PUT",
      body: JSON.stringify({
        type: "saveTheme",
        theme,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await resObj.json()) as ApiResponse;
  };

  relocateTheme = async (oldThemeId: string, theme: Theme) => {
    const resObj = await fetch(`/api/admin/temalar/${oldThemeId}`, {
      method: "PUT",
      body: JSON.stringify({
        type: "relocateTheme",
        theme,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await resObj.json()) as ApiResponse;
  };

  createTheme = async (theme: Theme) => {
    const resObj = await fetch(`/api/admin/temalar`, {
      method: "PUT",
      body: JSON.stringify({
        type: "createTheme",
        theme,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await resObj.json()) as ApiResponse;
  };

  deleteTheme = async (themeId: string) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}`, {
      method: "DELETE",
    });
    return (await resObj.json()) as ApiResponse;
  };
}
