import { Exercise } from "./exercise";

export class MultipleChoiceQuestion {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly choices: [string, string, string, string],
    readonly answer: 0 | 1 | 2 | 3,
    public reply?: 0 | 1 | 2 | 3
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

  get isCorrect() {
    return this.answer === this.reply;
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

  protected createFrom(exercise: MultipleChoiceExercise) {
    return MultipleChoiceExercise.from(exercise);
  }

  replyTheQuestion(questionId: string, reply: MultipleChoiceQuestion["reply"]) {
    const questions = this.questions.map((q) => {
      if (q.id !== questionId) return q;
      q.reply = reply;
      return MultipleChoiceQuestion.from(q);
    });
    return new MultipleChoiceExercise(this.activityId, questions);
  }

  static from(obj: MultipleChoiceExercise) {
    const questionObjs = obj.questions.map(
      (question) =>
        new MultipleChoiceQuestion(
          question.id,
          question.question,
          question.choices,
          question.answer,
          question.reply
        )
    );
    return new MultipleChoiceExercise(obj.activityId, questionObjs);
  }
}
