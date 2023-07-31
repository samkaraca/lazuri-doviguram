import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { Blank } from "./blank";
import { Item } from "./item";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";

export default class DndSetting {
  constructor(
    readonly blanks: Blank[],
    readonly board: Item[],
    readonly draggedItem: Item | null
  ) {}

  static from(obj: DndSetting) {
    return new DndSetting(
      obj.blanks.map((b) => Blank.from(b)),
      obj.board.map((e) => Item.from(e)),
      obj.draggedItem ? Item.from(obj.draggedItem) : null
    );
  }

  startDragging(item: Item) {
    return new DndSetting(this.blanks, this.board, item);
  }

  stopDragging = (
    action: { type: "on-space" } | { type: "on-blank"; blankId: Blank["id"] }
  ) => {
    if (!this.draggedItem) return this;
    let newBlanks: Blank[] = [...this.blanks];
    let newBoard: Item[] = [...this.board];

    // <remove dragged item from both board and blanks just in case>
    newBlanks = newBlanks.map((blank) => {
      if (blank.item?.id === this.draggedItem!.id) return Blank.empty(blank);
      return blank;
    });
    newBoard = newBoard.filter((item) => item.id !== this.draggedItem!.id);
    // </remove dragged item from both board and blanks just in case>

    if (action.type === "on-blank") {
      const blankIndex = newBlanks.findIndex(
        (blank) => blank.id === action.blankId
      );
      if (blankIndex === -1) return this;

      // <remove the predecessor if it exists>
      const blankItem = newBlanks[blankIndex].item;
      if (blankItem) {
        newBlanks = newBlanks.map((blank) => {
          if (blank.item?.id === blankItem.id) return Blank.empty(blank);
          return blank;
        });
        newBoard = [...newBoard, Item.from(blankItem)];
      }
      // </remove the predecessor if it exists>

      // place the successor finally
      newBlanks[blankIndex] = Blank.fill(
        newBlanks[blankIndex],
        Item.from(this.draggedItem)
      );
    } else if (action.type === "on-space") {
      newBoard = [...newBoard, Item.from(this.draggedItem)];
    }

    return new DndSetting(newBlanks, newBoard, null);
  };
}
