import { nanoid } from "nanoid";
import { Lesson } from "./lesson";

export function defaultLesson(lesson?: Partial<Lesson>) {
  const id = nanoid(7);

  return {
    id,
    title: "Yeni ders",
    explanation: "Ders açıklaması...",
    activities: [],
    ...lesson,
  } as Lesson;
}
