import { nanoid } from "nanoid";
import IActivity from "./activity";

export function defaultActivity(activity?: Partial<IActivity>) {
  const id = nanoid(7);

  return {
    id,
    title: "Yeni aktivite",
    explanation: "Aktivite açıklaması...",
    type: "true-false",
    exercise: { type: "qa-exercise", template: [], answers: [] },
    textContent: null,
    audio: null,
    image: null,
    youtubeVideoUrl: null,
    savedAt: Date.now(),
    ...activity,
  } as IActivity;
}
