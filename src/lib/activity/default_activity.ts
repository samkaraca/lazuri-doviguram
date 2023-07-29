import { nanoid } from "nanoid";
import { SimpleExercise } from "../exercises/simple_question_exercise";
import { Activity } from "./activity";

export function defaultActivity(activity?: Partial<Activity>) {
  const id = nanoid(7);

  return {
    id,
    title: "Yeni aktivite",
    explanation: "Aktivite açıklaması...",
    type: "true-false",
    exercise: new SimpleExercise("a123456", []),
    textContent: null,
    audio: null,
    image: null,
    youtubeVideoUrl: null,
    ...activity,
  } as Activity;
}
