import IExercise from "../exercise";
import IFillInBlanksExerciseUnit from "./fill_in_blanks_exercise_unit";

export default interface IFillInBlanksExercise extends IExercise {
  type: "fill-in-blanks-exercise";
  template: IFillInBlanksExerciseUnit[];
}
