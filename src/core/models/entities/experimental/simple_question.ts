import { Exercise } from "./exercise";

export class SimpleQuestion {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly answer: string,
    readonly reply: string
  ) {}

  static from(obj: SimpleQuestion) {
    return new SimpleQuestion(obj.id, obj.question, obj.answer, obj.reply);
  }
}

export class SimpleExercise extends Exercise<SimpleQuestion> {
  constructor(
    readonly activityId: string,
    readonly questions: SimpleQuestion[]
  ) {
    super(activityId, questions);
  }

  get grade(): number {
    let correct = 0;
    let total = 0;

    this.questions.forEach((question) => {
      if (question.answer === question.reply) correct++;
      total++;
    });

    return (correct / total) * 100;
  }

  protected createFrom(activityId: string, questions: SimpleQuestion[]) {
    return new SimpleExercise(activityId, questions);
  }
}
