import { Exercise } from "./exercise";

export class MultipleChoiceQuestion {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly choices: [string, string, string, string],
    readonly answer: 0 | 1 | 2 | 3,
    readonly reply: 0 | 1 | 2 | 3
  ) {}

  static from(obj: MultipleChoiceQuestion) {
    return new MultipleChoiceQuestion(
      obj.id,
      obj.question,
      obj.choices,
      obj.answer,
      obj.reply
    );
  }
}

export class MultipleChoiceExercise extends Exercise<MultipleChoiceQuestion> {
  constructor(
    readonly activityId: string,
    readonly questions: MultipleChoiceQuestion[]
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

  protected createFrom(
    activityId: string,
    questions: MultipleChoiceQuestion[]
  ) {
    return new MultipleChoiceExercise(activityId, questions);
  }
}
