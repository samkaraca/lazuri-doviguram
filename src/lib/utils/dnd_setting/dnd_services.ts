import { nanoid } from "nanoid";
import DndSetting from "./dnd_setting";
import IDraggable from "./draggable";
import IBlank from "./blank";
import IExercise from "@/lib/exercise/exercise";
import IReply from "@/lib/exercise/reply";
import IAnswer from "@/lib/exercise/answer";

/**
 * DnD Serice assumes:
 * - There is a board that contains items with certain values
 * with possibly changing ids.
 * - There are blanks, each of which has the same id and value all the time.
 * - An item can be picked from the board or a blank. In either
 * case, if it is dropped onto space, it's moved to the board
 * --------------------
 * - When an item from blanks or board picked (startDragging),
 * that item is copied into newDraggedItem without touching
 * the original item.
 * - Note that after we start dragging, we assume we do not know
 * where newDraggedItem was picked from, i.e., whether it was
 * from board or a blank
 * - When it is dropped (stopDragging) the algorithm works this way:
 * 1) Determine if the dragged item comes from the board or a blank, and remove it from there.
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

  /**
   * remove dragged item from board if it was started being dragged
   * from board, or from blanks if it was started being dragged from blanks.
   * and, indicate where it was dragged from with draggedFrom variable.
   */
  const blankIndex = newBlanks.findIndex(
    (blank) => blank.id === newDraggedItem.id
  );
  const boardIndex = newBoard.findIndex(
    (item) => item.id === newDraggedItem.id
  );
  const draggedFrom =
    blankIndex !== -1 ? "blanks" : boardIndex !== -1 ? "board" : undefined;
  if (draggedFrom === "blanks") {
    newBlanks = newBlanks.map((blank) => {
      if (blank.id === newDraggedItem.id) return { id: blank.id, value: null };
      return blank;
    });
  } else if (draggedFrom === "board") {
    newBoard = newBoard.filter((item) => item.id !== newDraggedItem.id);
  } else {
    throw new Error("Dragged item is not found in neither blanks nor board");
  }

  if (action.type === "on-blank") {
    const blankIndex = newBlanks.findIndex((b) => b.id === action.blankId)!;

    /**
     * If the blank is occupied, there are three cases we need to consider:
     * 1) The blank is empty
     * 2) The blank is occupied and the successor is coming from board: In this case,
     * we need to remove the predecessor item from the board and place it into
     * the board index that the successor item was picked from, thus achieving
     * the swapping effect instead of putting the predecessor item into a random
     * board index, which confuses the user.
     * 3) The blank is occupied and the successor is coming from another blank: In this case,
     * we simply put the predecessor item at the end of the board.
     */
    const predecessor = { ...newBlanks[blankIndex] };
    if (predecessor.value) {
      if (draggedFrom === "blanks") {
        newBoard = [...newBoard, { id: nanoid(7), value: predecessor.value }];
      } else if (draggedFrom === "board") {
        newBoard.splice(boardIndex, 0, {
          id: nanoid(7),
          value: predecessor.value,
        });
      }
      newBlanks[blankIndex] = { id: newBlanks[blankIndex].id, value: null };
    }

    // place the successor finally
    newBlanks[blankIndex] = {
      id: newBlanks[blankIndex].id,
      value: newDraggedItem.value,
    };
  } else if (action.type === "on-space") {
    /**
     * There are two cases we need to consider:
     * 1) The dragged item is coming from blanks: In this case,
     * we simply place the item at the end of the board.
     * 2) The dragged item is coming from board: In this case,
     * we put the item into the index that it was originally picked from.
     */
    if (draggedFrom === "blanks") {
      newBoard = [...newBoard, { id: nanoid(7), value: newDraggedItem.value }];
    } else if (draggedFrom === "board") {
      newBoard.splice(boardIndex, 0, {
        id: nanoid(7),
        value: newDraggedItem.value,
      });
    }
  }

  return {
    board: newBoard,
    blanks: newBlanks,
    draggedItem: null,
  };
};

/**
 * Creates the board item list from all exercise answer
 * by removing the items that are already replied
 */
export const boardFrom = (
  exercise: IExercise,
  replies: IReply[]
): IAnswer[] => {
  // get the values that are already replied
  const valueBlacklist = replies
    .filter((r) => r.value !== null && r.value !== undefined)
    .map((e) => e.value as string);

  // remove the replied values from the exercise answers. the end result is the board
  const board = valueBlacklist.reduce(
    (acc, cur) => {
      const index = acc.findIndex((e) => e.value === cur);
      if (index === -1) return acc;
      return acc.filter((e, i) => i !== index);
    },
    [...exercise.answers]
  );

  // add unique ids to each board item
  return shuffle(board).map((e) => ({ ...e, id: nanoid() }));
};

const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
