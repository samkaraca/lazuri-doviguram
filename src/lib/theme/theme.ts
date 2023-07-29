import { Lesson } from "../lesson/lesson";

export class Theme {
  private constructor(
    readonly createdAt: number,
    readonly id: string,
    readonly title: string,
    readonly explanation: string,
    readonly image: string,
    readonly youtubeVideoUrl: string,
    readonly lessons: Lesson[]
  ) {}

  static from({
    id,
    title,
    explanation,
    image,
    youtubeVideoUrl,
    lessons,
    createdAt,
  }: Theme) {
    return new Theme(
      createdAt,
      id,
      title,
      explanation,
      image,
      youtubeVideoUrl,
      lessons.map((l) => Lesson.from(l))
    );
  }
}
