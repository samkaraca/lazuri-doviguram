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

    // <remove dragged item from both board and blanks just in case>
    setBlanks((prev) => {
      return prev.map((blank) => {
        if (blank.item?.id === draggedItem.id) return Blank.empty(blank);
        return Blank.from(blank);
      });
    });
    setBoard((prev) => {
      return prev.filter((item) => item.id !== draggedItem.id);
    });
    // </remove dragged item from both board and blanks just in case>

    if (action.type === "on-blank") {
      const blankIndex = blanks.findIndex(
        (blank) => blank.id === action.blankId
      );
      if (blankIndex === -1) return;

      // <remove the predecessor if it exists>
      const blankItem = blanks[blankIndex].item;
      if (blankItem) {
        setBlanks((prev) => {
          return prev.map((blank) => {
            if (blank.item?.id === blankItem.id) return Blank.empty(blank);
            return Blank.from(blank);
          });
        });
        setBoard((prev) => [...prev, Item.from(blankItem)]);
      }
      // </remove the predecessor if it exists>

      // place the successor finally
      setBlanks((prev) => {
        const newBlanks = [...prev];
        newBlanks[blankIndex] = Blank.fill(
          newBlanks[blankIndex],
          Item.from(draggedItem)
        );
        return newBlanks;
      });
    } else if (action.type === "on-space") {
      setBoard((prev) => {
        return [...prev, Item.from(draggedItem)];
      });
    }

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
