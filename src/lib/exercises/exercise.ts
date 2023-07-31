export abstract class Exercise<QuestionType> {
  constructor(readonly questions: QuestionType[]) {}
}
