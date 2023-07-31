import { Exercise } from "./exercise";

export class SimpleQuestion {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly answer: string
  ) {}

  static from(obj: SimpleQuestion) {
    return new SimpleQuestion(obj.id, obj.question, obj.answer);
  }
}

export class SimpleExercise {
  constructor(readonly questions: SimpleQuestion[]) {}

  get repliesTemplate(): {
    id: string;
    value: null | SimpleQuestion["answer"];
  }[] {
    return this.questions.map((q) => ({ id: q.id, value: null }));
  }

  grade(
    replies: { id: string; value: null | SimpleQuestion["answer"] }[]
  ): number {
    let correct = 0;
    let total = 0;

    this.questions.forEach((question) => {
      const reply = replies.find((r) => r.id === question.id);
      if (reply && question.answer === reply.value) correct++;
      total++;
    });

    return (correct / total) * 100;
  }

  static from(obj: SimpleExercise) {
    const questionObjs = obj.questions.map(
      (question) =>
        new SimpleQuestion(question.id, question.question, question.answer)
    );
    return new SimpleExercise(questionObjs);
  }
}
