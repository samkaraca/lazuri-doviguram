import {
  FillInBlanksQuestion,
  MultipleChoiceQuestion,
  Question,
  SimpleQuestion,
  TrueFalseQuestion,
} from "./question";

export class Theme {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly explanation: string,
    readonly URLPath: string,
    readonly image: string,
    readonly youtubeVideoUrl: string,
    readonly lessons: LessonMap,
    readonly createdAt: number
  ) {}

  static from({
    id,
    title,
    explanation,
    URLPath,
    image,
    youtubeVideoUrl,
    lessons,
    createdAt,
  }: Theme) {
    const newLessons = { ...lessons };

    for (const { id } of lessons.meta) {
      const newLesson: Lesson = { ...lessons[id] };

      for (const activityId of newLesson.activities.idOrderMeta) {
        const newActivity = { ...lessons[id].activities[activityId] };
        newLesson.activities[activityId] = Activity.from(newActivity);
      }

      newLessons[id] = newLesson;
    }

    return new Theme(
      id,
      title,
      explanation,
      URLPath,
      image,
      youtubeVideoUrl,
      newLessons,
      createdAt
    );
  }
}

export type LessonMap = { [id: string]: Lesson } & { meta: LessonMeta[] };

export interface LessonMeta {
  id: string;
  title: string;
}

export interface Lesson {
  explanation: string;
  activities: ActivityMap;
}

export type ActivityMap = { [id: string]: Activity<any> } & {
  idOrderMeta: string[];
};

export class Activity<
  ActivityType extends
    | "type-in-blanks"
    | "drag-into-blanks"
    | "multiple-choice"
    | "pair-texts-with-images"
    | "true-false"
> {
  constructor(
    readonly title: string,
    readonly explanation: string,
    readonly textContent: string | null,
    readonly image: string | null,
    readonly youtubeVideoUrl: string | null,
    readonly audio: string | null,
    readonly activityType: ActivityType,
    readonly questions: ActivityType extends
      | "type-in-blanks"
      | "drag-into-blanks"
      ? FillInBlanksQuestion[]
      : ActivityType extends "multiple-choice"
      ? MultipleChoiceQuestion[]
      : ActivityType extends "pair-texts-with-images"
      ? SimpleQuestion[]
      : TrueFalseQuestion[]
  ) {}

  static from({
    title,
    explanation,
    textContent,
    image,
    youtubeVideoUrl,
    audio,
    activityType,
    questions,
  }: Activity<any>) {
    return new Activity(
      title,
      explanation,
      textContent,
      image,
      youtubeVideoUrl,
      audio,
      activityType,
      questions.map((question): any => {
        if (
          activityType === "type-in-blanks" ||
          activityType === "drag-into-blanks"
        ) {
          return FillInBlanksQuestion.from(question as FillInBlanksQuestion);
        } else if (activityType === "multiple-choice") {
          return MultipleChoiceQuestion.from(
            question as MultipleChoiceQuestion
          );
        } else if (activityType === "pair-texts-with-images") {
          return SimpleQuestion.from(question as SimpleQuestion);
        } else if (activityType === "true-false") {
          return TrueFalseQuestion.from(question as TrueFalseQuestion);
        }
      })
    );
  }
}
