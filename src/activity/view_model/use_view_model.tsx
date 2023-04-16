import useAlienViewModelContext from "@/admin_panel/activity_editor/view_model";
import { useEffect, useState } from "react";
import {
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

export function useViewModel(): IViewModel {
  const alienViewModel = useAlienViewModelContext()!;
  const {
    explanation,
    textAppendix,
    typeOrDragExercise,
    trueOrFalseExercise,
    activityType,
  } = alienViewModel;
  const [exerciseItems, setExerciseItems] = useState<IRefinedExerciseItem[]>(
    []
  );
  const [board, setBoard] = useState<IBoardItem[]>(new Array());
  const [draggedItem, setDraggedItem] = useState<IBoardItem | null>(null);
  const [exerciseLocked, setExerciseLocked] = useState(false);

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
    const refinedItems = typeOrDragExercise.map((item) => {
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
  }, [typeOrDragExercise]);

  return {
    activityType,
    explanation,
    textAppendix,
    typeOrDragExercise,
    trueOrFalseExercise,
    exerciseLocked,
    setExerciseLocked,
    exerciseItems,
    setExerciseItems,
    board,
    setBoard,
    draggedItem,
    setDraggedItem,
    placeBoardItem,
  };
}
