import { useEffect, useRef, useState } from "react";
import {
  ActivityType,
  IExerciseItem,
  ITextAppendix,
  initialActivityType,
} from "../model/activity/activity";
import { IViewModel } from "../model/view_model";
import livingStateOf from "@/core/functions/react_functions";
import getActivity from "../services/get_activity";
import { persistActivity } from "../services/persist_activity";

export function useViewModel(): IViewModel {
  const [activityType, setActivityType] =
    useState<ActivityType>(initialActivityType);
  const [textAppendix, setTextAppendix] = useState<ITextAppendix | null>(null);
  const [exercise, setExercise] = useState<IExerciseItem[]>(
    [] as IExerciseItem[]
  );
  const [explanation, setExplanation] = useState<string>("");
  const activityCode = useRef("");

  useEffect(() => {
    getActivity().then((activity) => {
      const { exercise, textAppendix, type, explanation, code } = activity;
      activityCode.current = code;
      setExplanation(explanation);
      setActivityType(type);
      setTextAppendix(textAppendix);
      setExercise(exercise);
    });
  }, []);

  return {
    activityType,
    setActivityType,
    textAppendix,
    setTextAppendix,
    explanation,
    setExplanation,
    exercise,
    setExercise,
    save: () => {
      persistActivity({
        type: livingStateOf(setActivityType)!,
        code: activityCode.current,
        explanation,
        textAppendix: livingStateOf(setTextAppendix)!,
        exercise: livingStateOf(setExercise)!,
      });
    },
  };
}
