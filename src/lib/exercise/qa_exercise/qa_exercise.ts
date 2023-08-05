import IExercise from "../exercise";
import IQAExerciseUnit from "./qa_exercise_unit";

export default interface IQAExercise extends IExercise {
  type: "qa-exercise";
  template: IQAExerciseUnit[];
}
