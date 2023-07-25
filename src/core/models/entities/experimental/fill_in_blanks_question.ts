import { Exercise } from "./exercise";

export class FillInBlanksQuestion {
  constructor(
    readonly id: string,
    readonly rawQuestion: Map<
      string,
      {
        type: "text" | "blank";
        value: string;
      }
    >,
    readonly replies: Map<string, string>
  ) {}

  static fromPure(
    id: string,
    rawQuestion: Map<
      string,
      {
        type: "text" | "blank";
        value: string;
      }
    >
  ) {
    return new FillInBlanksQuestion(id, rawQuestion, new Map());
  }

  static from(obj: FillInBlanksQuestion) {
    return new FillInBlanksQuestion(obj.id, obj.rawQuestion, obj.replies);
  }

  get answers(): Map<string, { type: "blank"; value: string }> {
    return new Map(
      Array.from(this.rawQuestion).filter(
        ([qKey, question]) => question.type === "blank"
      )
    ) as Map<string, { type: "blank"; value: string }>;
  }

  toJSON() {
    return {
      id: this.id,
      rawQuestion: Array.from(this.rawQuestion),
      replies: Array.from(this.replies),
    };
  }
}

export class FillInBlanksExercise extends Exercise<FillInBlanksQuestion> {
  constructor(
    readonly activityId: string,
    readonly questions: FillInBlanksQuestion[]
  ) {
    super(activityId, questions);
  }

  get grade(): number {
    let correct = 0;
    let total = 0;

    this.questions.forEach((question) => {
      question.answers.forEach((val, key) => {
        const answer = val.value;
        if (question.replies.get(key) === answer) correct++;
        total++;
      });
    });

    return (correct / total) * 100;
  }

  get answers() {
    return this.questions
      .map((question) => question.answers)
      .reduce(
        (accumulator, current) =>
          new Map([...Array.from(accumulator), ...Array.from(current)]),
        new Map()
      );
  }

  protected createFrom(activityId: string, questions: FillInBlanksQuestion[]) {
    return new FillInBlanksExercise(activityId, questions);
  }
}
