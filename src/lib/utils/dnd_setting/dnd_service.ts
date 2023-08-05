import { nanoid } from "nanoid";
import DndSetting from "./dnd_setting";
import IDraggable from "./draggable";
import IBlank from "./blank";
/**
 * DnD Serice assumes:
 * - There is a board that contains items with certain values
 * with possibly changing ids.
 * - There are blanks, each of which has the same id and
 * the same value all the time.
 * - An item can be picked from the board or a blank. In either
 * case, if it is dropped onto space, it is removed from its moved
 * to the board
 * --------------------
 * - When an item from blanks or board picked (startDragging),
 * that item is copied into newDraggedItem without touching
 * the original item.
 * - Note that after we start dragging, we assume we do not know
 * where newDraggedItem was picked from, i.e. whether it was
 * from board or a blank
 * - When it is dropped (stopDragging) the algorithm works this way:
 * 1) Clean the board and blank it is possibly coming from
 *      -> if there is any, remove the board item with the same id
 *      -> if it is occupied, nullify the blank with the same id
 * 2) If it is dropped onto a blank, we need to make sure whether
 * there is an already occupying item in the target blank. If there
 * is, we need to move that item to board. If there isn't any, we
 * can safely place our newDraggedItem into that blank
 */

export const stopDragging = (
  dndSetting: Omit<DndSetting, "draggedItem"> & { draggedItem: IDraggable },
  action: { type: "on-space" } | { type: "on-blank"; blankId: string }
): DndSetting => {
  let newBlanks: IBlank[] = [...dndSetting.blanks];
  let newBoard: IDraggable[] = [...dndSetting.board];
  let newDraggedItem: IDraggable = { ...dndSetting.draggedItem };

  // <remove dragged item from both board and blanks just in case>
  newBlanks = newBlanks.map((blank) => {
    if (blank.id === newDraggedItem.id) return { id: blank.id, value: null };
    return blank;
  });
  newBoard = newBoard.filter((item) => item.id !== newDraggedItem.id);
  // </remove dragged item from both board and blanks just in case>

  if (action.type === "on-blank") {
    const blankIndex = newBlanks.findIndex((b) => b.id === action.blankId)!;

    // <remove the predecessor if it exists>
    const predecessor = { ...newBlanks[blankIndex] };
    if (predecessor.value) {
      newBoard = [...newBoard, { id: nanoid(7), value: predecessor.value }];
      newBlanks[blankIndex] = { id: newBlanks[blankIndex].id, value: null };
    }
    // </remove the predecessor if it exists>

    // place the successor finally
    newBlanks[blankIndex] = {
      id: newBlanks[blankIndex].id,
      value: newDraggedItem.value,
    };
  } else if (action.type === "on-space") {
    newBoard = [...newBoard, { id: nanoid(7), value: newDraggedItem.value }];
  }

  return {
    board: newBoard,
    blanks: newBlanks,
    draggedItem: null,
  };
};
