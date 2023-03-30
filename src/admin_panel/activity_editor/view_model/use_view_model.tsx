import { useEffect, useReducer, useRef, useState } from "react";
import {
  ActivityType,
  IExerciseItem,
  ITextAppendix,
  initialActivityType,
} from "../model/activity/activity";
import {
  ITrueOrFalseExerciseItemAction,
  ITypeOrDragExerciseItemAction,
  IViewModel,
} from "../model/view_model";
import { persistActivity } from "../services/persist_activity";
import {
  ITrueOrFalseExerciseItemContent,
  ITypeOrDragExerciseItemContent,
} from "../model/activity";
import getActivity from "../services/get_activity";

function typeOrDragExerciseReducer(
  prevExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[],
  action: ITypeOrDragExerciseItemAction
): IExerciseItem<ITypeOrDragExerciseItemContent>[] {
  let newExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[];

  switch (action.type) {
    case "change":
      newExercise = [...prevExercise];
      const newItem = newExercise.find((x) => x.id === action.id)!;

      newItem.content.rawContent = action.text;
      const regExp = /(\[.*?\])/;
      const contentTextPieces = newItem.content.rawContent.split(regExp);

      newItem.content.processedContent = contentTextPieces.map((piece) => {
        if (piece.startsWith("[") && piece.endsWith("]")) {
          const correctAnswer = piece.replaceAll("[", "").replaceAll("]", "");
          return {
            type: "text-input",
            correctAnswer,
          };
        }
        return { type: "text", text: piece };
      });

      break;

    case "initialize":
      newExercise = [...action.data];
      break;

    case "add":
      newExercise = [...prevExercise, action.item];
      break;

    case "remove":
      newExercise = [...prevExercise].filter((x) => x.id !== action.id);
      break;

    case "reset":
      newExercise = [];
      break;
  }

  return newExercise;
}

function trueOrFalseExerciseReducer(
  prevExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[],
  action: ITrueOrFalseExerciseItemAction
) {
  let newExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[];

  switch (action.type) {
    case "changeText":
      newExercise = [...prevExercise];
      newExercise.find((x) => x.id === action.id)!.content.text = action.text;
      break;

    case "changeIsTrue":
      newExercise = [...prevExercise];
      newExercise.find((x) => x.id === action.id)!.content.isTrue =
        action.isTrue;
      break;

    case "initialize":
      newExercise = [...action.data];
      break;

    case "add":
      newExercise = [...prevExercise, action.item];
      break;

    case "remove":
      newExercise = [...prevExercise].filter((x) => x.id !== action.id);
      break;

    case "reset":
      newExercise = [];
      break;
  }

  return newExercise;
}

export function useViewModel(): IViewModel {
  const [activityType, setActivityType] =
    useState<ActivityType>(initialActivityType);
  const [textAppendix, setTextAppendix] = useState<ITextAppendix | null>(null);
  const [typeOrDragExercise, dispatchTypeOrDragExercise] = useReducer(
    typeOrDragExerciseReducer,
    []
  );
  const [trueOrFalseExercise, dispatchTrueOrFalseExercise] = useReducer(
    trueOrFalseExerciseReducer,
    []
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
      dispatchTypeOrDragExercise({
        type: "initialize",
        data: exercise as IExerciseItem<ITypeOrDragExerciseItemContent>[],
      });
      dispatchTrueOrFalseExercise({
        type: "initialize",
        data: exercise as IExerciseItem<ITrueOrFalseExerciseItemContent>[],
      });
    });
  }, []);

  return {
    activityType,
    setActivityType,
    textAppendix,
    setTextAppendix,
    explanation,
    setExplanation,
    typeOrDragExercise,
    dispatchTypeOrDragExercise,
    trueOrFalseExercise,
    dispatchTrueOrFalseExercise,
    save: () =>
      persistActivity({
        type: activityType,
        code: activityCode.current,
        explanation,
        textAppendix,
        exercise:
          activityType === "true-or-false"
            ? trueOrFalseExercise
            : typeOrDragExercise,
      }),
  };
}
