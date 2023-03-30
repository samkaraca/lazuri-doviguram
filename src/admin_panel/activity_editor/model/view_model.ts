import { Dispatch, SetStateAction } from "react";
import {
  ActivityType,
  IExerciseItem,
  ITextAppendix,
} from "./activity/activity";
import {
  ITrueOrFalseExerciseItemContent,
  ITypeOrDragExerciseItemContent,
} from "./activity";

export type ITrueOrFalseExerciseItemAction =
  | {
      type: "remove";
      id: string;
    }
  | {
      type: "reset";
    }
  | {
      id: string;
      type: "changeIsTrue";
      isTrue: boolean;
    }
  | {
      id: string;
      type: "changeText";
      text: string;
    }
  | {
      type: "initialize";
      data: IExerciseItem<ITrueOrFalseExerciseItemContent>[];
    }
  | {
      type: "add";
      item: IExerciseItem<ITrueOrFalseExerciseItemContent>;
    };

export type ITypeOrDragExerciseItemAction =
  | {
      type: "initialize";
      data: IExerciseItem<ITypeOrDragExerciseItemContent>[];
    }
  | {
      type: "add";
      item: IExerciseItem<ITypeOrDragExerciseItemContent>;
    }
  | {
      type: "remove";
      id: string;
    }
  | {
      type: "change";
      id: string;
      text: string;
    }
  | {
      type: "reset";
    };

export interface IViewModel {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  textAppendix: ITextAppendix | null;
  setTextAppendix: Dispatch<SetStateAction<ITextAppendix | null>>;
  explanation: string;
  setExplanation: Dispatch<SetStateAction<string>>;
  typeOrDragExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[];
  dispatchTypeOrDragExercise: Dispatch<ITypeOrDragExerciseItemAction>;
  trueOrFalseExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[];
  dispatchTrueOrFalseExercise: Dispatch<ITrueOrFalseExerciseItemAction>;
  save: () => void;
}
