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

export class AnswerAndReply {
  constructor(
    readonly id: string,
    readonly answer: string,
    public reply?: string
  ) {}

  get isCorrect() {
    return this.answer === this.reply;
  }

  static from(obj: AnswerAndReply) {
    return new AnswerAndReply(obj.id, obj.answer, obj.reply);
  }
}

export class FillInBlanksExercise extends Exercise<FillInBlanksQuestion> {
  readonly answerAndReplys: AnswerAndReply[];

  constructor(
    readonly activityId: string,
    readonly questions: FillInBlanksQuestion[],
    answerAndReplys?: AnswerAndReply[]
  ) {
    super(activityId, questions);
    if (answerAndReplys) {
      this.answerAndReplys = answerAndReplys;
    } else {
      this.answerAndReplys = questions
        .map((q) => {
          const blanks = q.rawQuestion.filter((e) => e.type === "blank");
          return blanks.map((e) => new AnswerAndReply(e.id, e.value));
        })
        .flat();
    }
  }

  get grade() {
    let correct = 0;
    this.answerAndReplys.forEach((aar) => {
      if (aar.isCorrect) correct++;
    });
    return (correct / this.answerAndReplys.length) * 100;
  }

  replyTheQuestion(replyId: string, reply: AnswerAndReply["reply"]) {
    const aars = this.answerAndReplys.map((aar) => {
      if (aar.id !== replyId) return aar;
      return new AnswerAndReply(aar.id, aar.answer, reply);
    });
    return new FillInBlanksExercise(this.activityId, this.questions, aars);
  }

  protected createFrom(exercise: FillInBlanksExercise) {
    return FillInBlanksExercise.from(exercise);
  }

  static from(obj: FillInBlanksExercise) {
    const questions = obj.questions.map((q) => FillInBlanksQuestion.from(q));
    const answerAndReplys = obj.answerAndReplys.map((aar) =>
      AnswerAndReply.from(aar)
    );
    return new FillInBlanksExercise(obj.activityId, questions, answerAndReplys);
  }
}
