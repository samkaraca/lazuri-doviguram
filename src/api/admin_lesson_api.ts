import ILesson from "@/lib/lesson/lesson";
import { ApiResponse } from "./api_response";

export class AdminLessonApi {
  deleteLesson = async (themeId: string, lessonId: string) => {
    const resObj = await fetch(
      `/api/admin/themes/${themeId}/lessons/${lessonId}`,
      {
        method: "DELETE",
      }
    );
    return (await resObj.json()) as ApiResponse;
  };

  createLesson = async (themeId: string, lesson: ILesson) => {
    const resObj = await fetch(`/api/admin/themes/${themeId}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lesson,
      }),
    });
    return (await resObj.json()) as ApiResponse;
  };

  saveLesson = async (themeId: string, lesson: Omit<ILesson, "activities">) => {
    const resObj = await fetch(
      `/api/admin/themes/${themeId}/lessons/${lesson.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          lesson,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (await resObj.json()) as ApiResponse;
  };
}
