import { StatusResponse } from "./status_response";

export interface LessonRepository {
  createNewActivity: (
    themeId: string,
    lessonId: string
  ) => Promise<StatusResponse>;
  deleteLesson: (themeId: string, lessonId: string) => Promise<StatusResponse>;
  saveLesson: ({
    themeId,
    lessonId,
    lessonIndex,
    title,
    explanation,
  }: {
    themeId: string;
    lessonId: string;
    lessonIndex: number;
    title: string;
    explanation: string;
  }) => Promise<StatusResponse>;
}
