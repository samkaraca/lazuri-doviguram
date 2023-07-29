import { FillInBlanksExercise } from "../exercises/fill_in_blanks_exercise";
import { MultipleChoiceExercise } from "../exercises/multiple_choice_exercise";
import { SimpleExercise } from "../exercises/simple_question_exercise";

export class Activity {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly explanation: string,
    readonly textContent: string | null,
    readonly image: string | null,
    readonly youtubeVideoUrl: string | null,
    readonly audio: string | null,
    readonly type:
      | "true-false"
      | "type-in-blanks"
      | "drag-into-blanks"
      | "multiple-choice"
      | "pair-texts-with-images",
    readonly exercise:
      | FillInBlanksExercise
      | SimpleExercise
      | MultipleChoiceExercise
  ) {}

  static from(obj: Activity): Activity {
    return new Activity(
      obj.id,
      obj.title,
      obj.explanation,
      obj.textContent,
      obj.image,
      obj.youtubeVideoUrl,
      obj.audio,
      obj.type,
      obj.type === "drag-into-blanks" || obj.type === "type-in-blanks"
        ? FillInBlanksExercise.from(obj.exercise as any)
        : obj.type === "pair-texts-with-images" || obj.type === "true-false"
        ? SimpleExercise.from(obj.exercise as any)
        : MultipleChoiceExercise.from(obj.exercise as any)
    );
  }
}
