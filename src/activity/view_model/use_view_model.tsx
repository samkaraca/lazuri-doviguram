import useAlienViewModelContext from "@/admin_panel/activity_editor/view_model";
import { useEffect, useState } from "react";
import { IViewModel } from "../model/view_model";

export function useViewModel(): IViewModel {
  const alienViewModel = useAlienViewModelContext()!;
  const {
    explanation,
    textAppendix,
    typeOrDragExercise,
    trueOrFalseExercise,
    activityType,
  } = alienViewModel;
  const [exerciseLocked, setExerciseLocked] = useState(false);

  return {
    activityType,
    explanation,
    textAppendix,
    typeOrDragExercise,
    trueOrFalseExercise,
    exerciseLocked,
    setExerciseLocked,
  };
}
