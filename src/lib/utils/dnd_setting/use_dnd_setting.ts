import { useState } from "react";
import { Item } from "./item";
import { Blank } from "./blank";

export function useDndSetting({
  boardData,
  blanksData,
}: {
  boardData: Item[];
  blanksData: Blank[];
}) {
  const [board, setBoard] = useState<Item[]>(boardData);
  const [blanks, setBlanks] = useState<Blank[]>(blanksData);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);

  const startDragging = (item: Item) => {
    setDraggedItem(item);
  };

  const stopDragging = (
    action: { type: "on-space" } | { type: "on-blank"; blankId: Blank["id"] }
  ) => {
    if (!draggedItem) return;
    let newBlanks: Blank[] = [...blanks];
    let newBoard: Item[] = [...board];

    // <remove dragged item from both board and blanks just in case>
    newBlanks = newBlanks.map((blank) => {
      if (blank.item?.id === draggedItem.id) return Blank.empty(blank);
      return Blank.from(blank);
    });
    newBoard = newBoard.filter((item) => item.id !== draggedItem.id);
    // </remove dragged item from both board and blanks just in case>

    if (action.type === "on-blank") {
      const blankIndex = newBlanks.findIndex(
        (blank) => blank.id === action.blankId
      );
      if (blankIndex === -1) return;

      // <remove the predecessor if it exists>
      const blankItem = newBlanks[blankIndex].item;
      if (blankItem) {
        newBlanks = newBlanks.map((blank) => {
          if (blank.item?.id === blankItem.id) return Blank.empty(blank);
          return Blank.from(blank);
        });
        newBoard = [...newBoard, Item.from(blankItem)];
      }
      // </remove the predecessor if it exists>

      // place the successor finally
      newBlanks[blankIndex] = Blank.fill(
        newBlanks[blankIndex],
        Item.from(draggedItem)
      );
    } else if (action.type === "on-space") {
      newBoard = [...newBoard, Item.from(draggedItem)];
    }

    setBlanks(newBlanks);
    setBoard(newBoard);
    setDraggedItem(null);
  };

  return {
    setBoard,
    board,
    setBlanks,
    blanks,
    setDraggedItem,
    draggedItem,
    startDragging,
    stopDragging,
  };
}
