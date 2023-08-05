import IAnswer from "./answer";

export default interface IExercise {
  type: "fill-in-blanks-exercise" | "multiple-choice-exercise" | "qa-exercise";
  template: any[];
  answers: IAnswer[];
}
