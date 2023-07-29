import { Activity } from "../activity/activity";

export class Lesson {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly explanation: string,
    readonly activities: Activity[]
  ) {}

  static from(obj: Lesson) {
    return new Lesson(
      obj.id,
      obj.title,
      obj.explanation,
      obj.activities.map((a) => Activity.from(a))
    );
  }
}
