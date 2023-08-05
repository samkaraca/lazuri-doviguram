import { nanoid } from "nanoid";
import ILesson from "./lesson";

export function defaultLesson(lesson?: Partial<ILesson>) {
  const id = nanoid(7);

  return {
    id,
    title: "Yeni ders",
    explanation: "Ders açıklaması...",
    activities: [],
    ...lesson,
  } as ILesson;
}
