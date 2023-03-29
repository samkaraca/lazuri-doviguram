import { useEffect, useReducer, useRef, useState } from "react";
import {
  ActivityType,
  IExerciseItem,
  ITextAppendix,
  initialActivityType,
} from "../model/activity/activity";
import { IViewModel } from "../model/view_model";
import livingStateOf from "@/core/functions/react_functions";
import { persistActivity } from "../services/persist_activity";
import {
  ITrueOrFalseExerciseItemContent,
  ITypeOrDragExerciseItemContent,
  initialTrueOrFalse,
} from "../model/activity";
import { nanoid } from "nanoid";

function typeOrDragExerciseReducer(
  prevExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[],
  action: {
    type: "change" | "remove" | "add" | "reset";
    id: string;
    text: string;
  }
): IExerciseItem<ITypeOrDragExerciseItemContent>[] {
  let newExercise = [...prevExercise];

  switch (action.type) {
    case "change":
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

    case "add":
      newExercise = [
        ...newExercise,
        {
          id: nanoid(),
          content: { rawContent: "", processedContent: [] },
        },
      ];
      break;

    case "remove":
      newExercise = newExercise.filter((x) => x.id !== action.id);
      break;

    case "reset":
      newExercise = [];
      break;
  }

  return newExercise;
}

function trueOrFalseExerciseReducer(
  prevExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[],
  action: {
    type: "changeText" | "changeIsTrue" | "add" | "remove" | "reset";
    isTrue: boolean;
    text: string;
    id: string;
  }
) {
  let newExercise = [...prevExercise];

  switch (action.type) {
    case "changeText":
      newExercise.find((x) => x.id === action.id)!.content.text = action.text;
      break;

    case "changeIsTrue":
      newExercise.find((x) => x.id === action.id)!.content.isTrue =
        action.isTrue;
      break;

    case "add":
      newExercise.push({
        id: nanoid(),
        content: {
          isTrue: initialTrueOrFalse === "true" ? true : false,
          text: "",
        },
      });
      break;

    case "remove":
      newExercise = newExercise.filter((x) => x.id !== action.id);
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
    // getActivity().then((activity) => {
    //   const { exercise, textAppendix, type, explanation, code } = activity;
    //   activityCode.current = code;
    //   setExplanation(explanation);
    //   setActivityType(type);
    //   setTextAppendix(textAppendix);
    //   setTypeOrDragExercise(exercise);
    // });
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
    save: () => {
      persistActivity({
        type: livingStateOf(setActivityType)!,
        code: activityCode.current,
        explanation,
        textAppendix: livingStateOf(setTextAppendix)!,
        exercise: typeOrDragExercise,
      });
    },
  };
}
