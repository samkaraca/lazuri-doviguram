import { Exercise } from "./exercise";

export class MultipleChoiceQuestion {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly choices: [string, string, string, string],
    readonly answer: 0 | 1 | 2 | 3
  ) {}

  static from(obj: MultipleChoiceQuestion) {
    return new MultipleChoiceQuestion(
      obj.id,
      obj.question,
      obj.choices,
      obj.answer
    );
  }
}

export class MultipleChoiceExercise {
  constructor(readonly questions: MultipleChoiceQuestion[]) {}

  get repliesTemplate(): {
    id: string;
    value: null | MultipleChoiceQuestion["answer"];
  }[] {
    return this.questions.map((q) => ({ id: q.id, value: null }));
  }

  grade(
    replies: { id: string; value: null | MultipleChoiceQuestion["answer"] }[]
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

  static from(obj: MultipleChoiceExercise) {
    const questionObjs = obj.questions.map(
      (question) =>
        new MultipleChoiceQuestion(
          question.id,
          question.question,
          question.choices,
          question.answer
        )
    );
    return new MultipleChoiceExercise(questionObjs);
  }
}
