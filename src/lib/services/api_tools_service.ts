import { Lesson } from "../lesson/lesson";
import { Theme } from "../theme/theme";
import { DBLesson } from "../types/db_types/db_lesson";
import { DBTheme } from "../types/db_types/db_theme";

export const convertThemeUserToDB = (theme: Theme): DBTheme => {
  const newTheme = { ...theme } as any;
  let newLessons = Object.fromEntries(
    newTheme.lessons.map((l: any) => {
      const dbLesson = { ...l } as any;
      return [l.id, convertLessonUserToDB(dbLesson)];
    })
  );
  newLessons = {
    ...newLessons,
    idOrder: newTheme.lessons.map((l: any) => l.id),
  };
  newTheme.lessons = newLessons;
  newTheme.pk = "theme";
  return newTheme;
};

export const convertThemeDBToUser = (themeData: DBTheme): Theme => {
  const newTheme = { ...themeData } as any;
  delete newTheme.pk;
  newTheme.lessons = newTheme.lessons.idOrder.map((lessonId: string) => {
    return convertLessonDBToUser(newTheme.lessons[lessonId], lessonId);
  });
  return newTheme;
};

export const convertLessonUserToDB = (lesson: Lesson): DBLesson => {
  const newLesson = { ...lesson } as any;
  let newActivities = Object.fromEntries(
    newLesson.activities.map((a: any) => {
      const dbActivity = { ...a } as any;
      delete dbActivity.id;
      return [a.id, dbActivity];
    })
  );
  newActivities = {
    ...newActivities,
    idOrder: newLesson.activities.map((a: any) => a.id),
  };
  newLesson.activities = newActivities;
  delete newLesson.id;
  return newLesson as any;
};

export const convertLessonDBToUser = (
  lessonData: DBLesson,
  lessonId: string
): Lesson => {
  const newLesson = { ...lessonData };
  newLesson.activities = newLesson.activities.idOrder.map(
    (activityId: string) => ({
      ...newLesson.activities[activityId],
      id: activityId,
    })
  );
  return { ...newLesson, id: lessonId } as any;
};
