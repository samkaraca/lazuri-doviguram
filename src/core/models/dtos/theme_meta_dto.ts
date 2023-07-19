import { LessonMeta, Theme } from "../entities/learning_unit";

export interface ThemeMetaDTO extends Pick<Theme, "title" | "image" | "id"> {
  lessons: LessonMeta[];
}
