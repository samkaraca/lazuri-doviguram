export type ThemeUpdate = {
  lessonId?: string;
  activityId?: string;
} & (
  | {
      data: { type: "setThemeTitle"; newTitle: string };
    }
  | {
      data: { type: "setThemeExplanation"; newExplanation: string };
    }
  | {
      data: { type: "setThemeImage"; newImage: string };
    }
  | {
      data: { type: "setThemeYoutubeVideoUrl"; newUrl: string };
    }
  | {
      data: { type: "createNewLesson" };
    }
  | {
      data: { type: "createNewActivity" };
      lessonId: string;
    }
  | {
      data: { type: "createNewTheme" };
    }
  | {
      data: { type: "setLessonTitle"; newTitle: string };
      lessonId: string;
    }
  | {
      data: { type: "deleteLesson"; lessonId: string };
    }
  | {
      data: { type: "setLessonExplanation"; newExplanation: string };
      lessonId: string;
    }
);

export class ThemeRepository {
  constructor(readonly themeId: string) {}

  updateThemeWith = async (update: ThemeUpdate) => {
    const { lessonId, activityId, data } = update;

    if (!lessonId && activityId)
      throw new Error("Activity update cannot be made without the lesson id");

    const additionalPaths =
      lessonId && activityId
        ? `/${lessonId}/${activityId}`
        : lessonId
        ? `/${lessonId}`
        : "";

    const res = await fetch(
      `/api/admin/temalar/${this.themeId}${additionalPaths}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };
}
