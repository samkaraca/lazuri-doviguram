import {
  ActivityType,
  IExerciseItem,
  IExerciseItemTextInputPiece,
  IExerciseItemTextPiece,
  ITextAppendix,
  ITrueOrFalseExerciseItemContent,
  ITypeOrDragExerciseItemContent,
} from "@/admin_panel/activity_editor/model/activity";
import { Dispatch, SetStateAction } from "react";

export interface IRefinedExerciseItemInputPiece {
  id: string;
  correctAnswer: string;
  type: IExerciseItemTextInputPiece["type"];
  userAnswer: IBoardItem | null;
}

export interface IBoardItemPiecePointer {
  itemIndex: number;
  pieceIndex: number;
  piece: IRefinedExerciseItemInputPiece;
}

export type IRefinedExerciseItem = {
  id: string;
  pieces: (IExerciseItemTextPiece | IRefinedExerciseItemInputPiece)[];
};

export interface IBoardItem {
  id: string;
  data: string;
}

export interface IViewModel {
  activityType: ActivityType;
  explanation: string;
  textAppendix: ITextAppendix | null;
  typeOrDragExercise: IExerciseItem<ITypeOrDragExerciseItemContent>[];
  trueOrFalseExercise: IExerciseItem<ITrueOrFalseExerciseItemContent>[];
  exerciseLocked: boolean;
  setExerciseLocked: Dispatch<SetStateAction<IViewModel["exerciseLocked"]>>;
  exerciseItems: IRefinedExerciseItem[];
  setExerciseItems: Dispatch<SetStateAction<IViewModel["exerciseItems"]>>;
  board: IBoardItem[];
  setBoard: Dispatch<SetStateAction<IViewModel["board"]>>;
  draggedItem: IBoardItem | null;
  setDraggedItem: Dispatch<SetStateAction<IViewModel["draggedItem"]>>;
  placeBoardItem: (
    toBoard: boolean,
    draggable: IBoardItem,
    droppable: IBoardItemPiecePointer
  ) => void;
}
