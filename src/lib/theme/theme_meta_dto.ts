import { LessonMetaDTO } from "../lesson/lesson_meta_dto";

export interface ThemeMetaDTO {
  _id: string;
  slug: string;
  title: string;
  image: string;
  lessons: LessonMetaDTO[];
  createdAt: Date;
}
