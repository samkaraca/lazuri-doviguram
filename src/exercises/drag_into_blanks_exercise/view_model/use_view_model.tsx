import { useEffect, useState } from "react";
import {
  ExerciseModel,
  IBoardItem,
  IBoardItemPiecePointer,
  IRefinedExerciseItem,
  IRefinedExerciseItemInputPiece,
  IViewModel,
} from "../model/view_model";
import {
  IExerciseItemTextInputPiece,
  IExerciseItemTextPiece,
} from "@/admin_panel/activity_editor/model/activity";
import { nanoid } from "nanoid";

export function useViewModel(exercise: ExerciseModel): IViewModel {
  const [exerciseItems, setExerciseItems] = useState<IRefinedExerciseItem[]>(
    []
  );
  const [board, setBoard] = useState<IBoardItem[]>(new Array());
  const [draggedItem, setDraggedItem] = useState<IBoardItem | null>(null);

  function placeBoardItem(
    toBoard: boolean,
    draggable: IBoardItem,
    droppable: IBoardItemPiecePointer
  ) {
    setExerciseItems((prev) => {
      const newExerciseItems = [...prev];
      const exerciseInputItem = newExerciseItems[droppable.itemIndex].pieces[
        droppable.pieceIndex
      ] as IRefinedExerciseItemInputPiece;
      exerciseInputItem.userAnswer = toBoard ? null : draggable;
      return newExerciseItems;
    });
    setBoard((prev) =>
      toBoard
        ? [...prev, draggable]
        : prev.filter((boardItem) => boardItem.id !== draggable.id)
    );
  }

  useEffect(() => {
    setExerciseItems([]);
    const boardItems = [] as IBoardItem[];
    const refinedItems = exercise.map((item) => {
      const pieces = JSON.parse(
        JSON.stringify(item.content.processedContent)
      ) as (IExerciseItemTextPiece | IExerciseItemTextInputPiece)[];
      const refinedPieces = pieces.map((piece) => {
        if (piece.type === "text") return piece;
        const id = nanoid();
        const correctAnswer = piece.correctAnswer;
        const boardItem = { id, data: correctAnswer };
        boardItems.push(boardItem);
        return {
          id,
          correctAnswer,
          type: "text-input",
          userAnswer: null,
        } as IRefinedExerciseItemInputPiece;
      });
      return { id: nanoid(), pieces: refinedPieces };
    });
    setBoard(boardItems);
    setExerciseItems(refinedItems);
  }, [exercise]);

  return {
    exerciseItems,
    board,
    setBoard,
    draggedItem,
    setDraggedItem,
    placeBoardItem,
  };
}
