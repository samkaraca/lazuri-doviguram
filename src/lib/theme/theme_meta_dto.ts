import { LessonMetaDTO } from "../lesson/lesson_meta_dto";

export interface ThemeMetaDTO {
  id: string;
  title: string;
  image: string;
  lessons: LessonMetaDTO[];
  createdAt: number;
}
