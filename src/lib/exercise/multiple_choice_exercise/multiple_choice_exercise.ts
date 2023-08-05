import IExercise from "../exercise";
import IMultipleChoiceExerciseUnit from "./multiple_choice_exercise_unit";

export default interface IMultipleChoiceExercise extends IExercise {
  type: "multiple-choice-exercise";
  template: IMultipleChoiceExerciseUnit[];
}
