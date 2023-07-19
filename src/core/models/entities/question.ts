import { nanoid } from "nanoid";

export interface Question<
  AnswerT extends boolean | string | number | Map<string, any>
> {
  question: string;
  answer: AnswerT;
  check: (...args: any) => boolean;
}

export class MultipleChoiceQuestion implements Question<number> {
  constructor(
    readonly question: string,
    readonly choices: string[],
    readonly answer: number
  ) {
    if (choices.length !== 4) throw new Error("There should be 4 choices!");
    if (answer > 3 || answer < 0)
      throw new Error(
        "Answer is out of range. It should be in the range of 0...3!"
      );
  }

  static from(obj: MultipleChoiceQuestion) {
    return new MultipleChoiceQuestion(obj.question, obj.choices, obj.answer);
  }

  check(reply: number): boolean {
    return this.answer === reply;
  }
}

export class TrueFalseQuestion implements Question<boolean> {
  constructor(readonly question: string, readonly answer: boolean) {}

  static from(obj: TrueFalseQuestion) {
    return new TrueFalseQuestion(obj.question, obj.answer);
  }

  check(reply: boolean): boolean {
    return this.answer === reply;
  }
}

export class FillInBlanksQuestion implements Question<Map<string, string>> {
  readonly parsed: Map<string, string | null>;
  readonly answer: Map<string, string>; // [answerKey, answer]

  constructor(readonly question: string) {
    this.parsed = new Map(
      this.question.split(/{(.+?)}/g).map((val, i) => [nanoid(), val])
    );
    this.answer = new Map(
      Array.from(this.parsed)
        .filter((entry, i) => i % 2 === 1)
        .map(([key, val]) => [key, val])
    ) as Map<string, string>;
  }

  static from(obj: FillInBlanksQuestion) {
    return new FillInBlanksQuestion(obj.question);
  }

  check(answerKey: string, reply: string): boolean {
    const answer = this.answer.get(answerKey);
    return answer !== undefined && answer !== null ? answer === reply : false;
  }
}

export class SimpleQuestion implements Question<string> {
  constructor(readonly question: string, readonly answer: string) {}

  static from(obj: SimpleQuestion) {
    return new SimpleQuestion(obj.question, obj.answer);
  }

  check(reply: string): boolean {
    return this.answer === reply;
  }
}
