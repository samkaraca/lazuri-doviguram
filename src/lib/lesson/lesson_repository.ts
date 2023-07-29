import { DBLesson } from "../types/db_types/db_lesson";

export interface LessonRepository {
  createLesson: (
    themeId: string,
    lessonId: string,
    lesson: DBLesson
  ) => Promise<any>;
  saveLesson: (
    themeId: string,
    lessonId: string,
    lesson: Omit<DBLesson, "activities">
  ) => Promise<any>;
  deleteLesson: (themeId: string, lessonId: string) => Promise<any>;
}
