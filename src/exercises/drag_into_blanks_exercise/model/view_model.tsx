import {
  IExerciseItem,
  IExerciseItemTextInputPiece,
  IExerciseItemTextPiece,
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

export type ExerciseModel = IExerciseItem<ITypeOrDragExerciseItemContent>[];

export interface IViewModel {
  exerciseItems: IRefinedExerciseItem[];
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
