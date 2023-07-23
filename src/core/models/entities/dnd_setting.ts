import { nanoid } from "nanoid";

export interface Blank {
  readonly answer: string;
  reply: string | null;
}

export interface BoardItem {
  readonly value: string;
  location: string | null;
}

export type BoardItemEntry = [string, BoardItem]; // [boardItemKey, boardItem]

export class DndSetting {
  draggedItem: BoardItemEntry | null;
  readonly blanks: Map<string, Blank>;
  readonly boardItems: Map<string, BoardItem>;

  static from(oldDragAndDropSetting: DndSetting) {
    const { blanks, boardItems, draggedItem } = oldDragAndDropSetting;
    return new DndSetting({
      blanks,
      boardItems,
      draggedItem,
    });
  }

  constructor(
    params?:
      | { answersWithKeys: Map<string, string> }
      | {
          blanks: Map<string, Blank>;
          boardItems: Map<string, BoardItem>;
          draggedItem: BoardItemEntry | null;
        }
  ) {
    this.blanks = new Map();
    this.boardItems = new Map();
    this.draggedItem = null;

    if (params && "answersWithKeys" in params) {
      const { answersWithKeys } = params;
      answersWithKeys.forEach((answer, key) => {
        this.blanks.set(key, { answer, reply: null });
      });
      answersWithKeys.forEach((answer, key) => {
        this.boardItems.set(nanoid(), { location: null, value: answer });
      });
    } else if (params && "blanks" in params) {
      const { blanks, boardItems, draggedItem } = params;

      this.blanks = new Map(blanks);
      this.boardItems = new Map(boardItems);
      this.draggedItem = draggedItem ? [...draggedItem] : null;
    }
  }

  check(blankKey: string) {
    const blank = this.blanks.get(blankKey);
    if (!blank) return false;
    return blank.answer === blank.reply;
  }

  startMoving = (newDraggedItem: BoardItemEntry) => {
    this.draggedItem = newDraggedItem;
    return DndSetting.from(this);
  };

  endMoving = (
    action:
      | {
          type: "on-space";
        }
      | { type: "on-blank"; blankKey: string }
  ) => {
    if (!this.draggedItem) {
      return DndSetting.from(this);
    }

    if (action.type === "on-space") {
      this.removeFromBlanksPassively(this.draggedItem[1].location);
      this.boardItems.set(this.draggedItem[0], {
        ...this.draggedItem[1],
        location: null,
      });
    } else if (action.type === "on-blank") {
      /**
       * let's look if there is an existent boardItem at the blank
       * we want to put our action boardItem (1)
       */
      const goesToAnOccupiedBlank = this.getBoardItemContainingTheLocation(
        action.blankKey
      );

      /**
       * (2) if there is an exsiting one, we need to remove that
       * boardItem from its place by setting its location to null
       */
      if (goesToAnOccupiedBlank) {
        this.boardItems.set(goesToAnOccupiedBlank[0], {
          ...goesToAnOccupiedBlank[1],
          location: null,
        });
      }

      /**
       * Finally, let's set the boardItem's location to its new place
       */
      this.boardItems.set(this.draggedItem[0], {
        ...this.draggedItem[1],
        location: action.blankKey,
      });
      this.addToBlanksPassively(action.blankKey, this.draggedItem[1].value);
    }

    this.draggedItem = null;
    return DndSetting.from(this);
  };

  reset = (): DndSetting => {
    const newBlanks = new Map(
      Array.from(this.blanks, ([key, { answer, reply }]) => [
        key,
        { answer, reply: null },
      ])
    ) as Map<string, Blank>;
    const newBoardItems = new Map(
      Array.from(this.boardItems, ([key, { location, value }]) => [
        key,
        { value, location: null },
      ])
    ) as Map<string, BoardItem>;
    return new DndSetting({
      blanks: newBlanks,
      boardItems: newBoardItems,
      draggedItem: null,
    });
  };

  /**
   * removes the item from blanks if it exists.
   * if not, does nothing without warning or throwing error
   */
  private removeFromBlanksPassively = (
    possibleBlankKey: string | null | undefined
  ) => {
    if (!possibleBlankKey) return;
    const blank = this.blanks.get(possibleBlankKey);
    if (blank) {
      this.blanks.set(possibleBlankKey, { answer: blank.answer, reply: null });
    }
  };

  getBoardItemContainingTheLocation(
    blankKey: string
  ): BoardItemEntry | undefined {
    return Array.from(this.boardItems).find(
      ([key, boardItem]) => boardItem.location === blankKey
    );
  }

  /**
   * adds the draggable to the specified blank.
   * if the blank does not exists, it does nothing without
   * warning or throwing error
   */
  private addToBlanksPassively = (blankKey: string, reply: string) => {
    const blank = this.blanks.get(blankKey);
    if (blank) {
      this.blanks.set(blankKey, {
        answer: blank.answer,
        reply,
      });
    }
  };
}
