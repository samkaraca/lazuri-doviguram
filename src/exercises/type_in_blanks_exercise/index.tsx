import { Context } from "react";
import { View } from "./view";
import { ViewModel } from "./view_model";
import { ExerciseModel } from "./model/view_model";

export function TypeInBlanksExercise({
  exercise,
}: {
  exercise: ExerciseModel;
}) {
  return (
    <ViewModel exercise={exercise}>
      <View />
    </ViewModel>
  );
}
