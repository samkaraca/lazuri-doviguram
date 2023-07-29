import { Exercise } from "./exercise";

export class SimpleQuestion {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly answer: string,
    public reply?: string
  ) {}

  static from(obj: SimpleQuestion) {
    return new SimpleQuestion(obj.id, obj.question, obj.answer, obj.reply);
  }

  get isCorrect() {
    return this.answer === this.reply;
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

  protected createFrom(exercise: SimpleExercise) {
    return SimpleExercise.from(exercise);
  }

  replyTheQuestion(questionId: string, reply: SimpleQuestion["reply"]) {
    const questions = this.questions.map((q) => {
      if (q.id !== questionId) return q;
      q.reply = reply;
      return SimpleQuestion.from(q);
    });
    return new SimpleExercise(this.activityId, questions);
  }

  static from(obj: SimpleExercise) {
    const questionObjs = obj.questions.map(
      (question) =>
        new SimpleQuestion(
          question.id,
          question.question,
          question.answer,
          question.reply
        )
    );
    return new SimpleExercise(obj.activityId, questionObjs);
  }
}
