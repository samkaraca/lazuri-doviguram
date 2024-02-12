import { DBLesson } from "@/backend/types/db_lesson";

export default interface ILessonRepository {
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
