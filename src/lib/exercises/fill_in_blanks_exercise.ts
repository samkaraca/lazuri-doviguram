import { Exercise } from "./exercise";

export class FillInBlanksQuestion {
  constructor(
    readonly id: string,
    readonly rawQuestion: {
      id: string;
      type: "text" | "blank";
      value: string;
    }[]
  ) {}

  static from(obj: FillInBlanksQuestion) {
    return new FillInBlanksQuestion(obj.id, obj.rawQuestion);
  }
}

export class FillInBlanksExercise {
  constructor(readonly questions: FillInBlanksQuestion[]) {}

  get repliesTemplate(): { id: string; value: null | string }[] {
    return this.blanks.map((b) => ({ id: b.id, value: null }));
  }

  get blanks() {
    return this.questions
      .map((q) => q.rawQuestion.filter((e) => e.type === "blank"))
      .flat();
  }

  grade(replies: { id: string; value: null | string }[]) {
    let correct = 0;
    let total = 0;

    this.blanks.forEach((b) => {
      const reply = replies.find((r) => r.id === b.id);
      if (reply && reply.value === b.value) correct++;
      total++;
    });
    return (correct / total) * 100;
  }

  static from(obj: FillInBlanksExercise) {
    const questions = obj.questions.map((q) => FillInBlanksQuestion.from(q));
    return new FillInBlanksExercise(questions);
  }
}
