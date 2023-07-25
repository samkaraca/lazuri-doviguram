import { nanoid } from "nanoid";
import { UserExerciseLocalRepository } from "../repositories/interfaces/user_exercise_loca_repository";

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
  readonly blanks: Map<string, Blank>;
  readonly boardItems: Map<string, BoardItem>;
  draggedItem: BoardItemEntry | null;

  static from(oldDragAndDropSetting: DndSetting) {
    const {
      blanks,
      boardItems,
      draggedItem,
      activityId,
      userExerciseLocalRepository,
    } = oldDragAndDropSetting;
    return new DndSetting(
      activityId,
      userExerciseLocalRepository,
      new Map(blanks),
      new Map(boardItems),
      draggedItem
    );
  }

  constructor(
    readonly activityId: string,
    readonly userExerciseLocalRepository: UserExerciseLocalRepository,
    blanks: Map<string, Blank>,
    boardItems?: Map<string, BoardItem>,
    draggedItem?: BoardItemEntry | null
  ) {
    this.blanks = new Map(blanks);

    if (boardItems) {
      this.boardItems = boardItems;
    } else {
      this.boardItems = new Map(
        Array.from(blanks, ([key, blank]) => [
          nanoid(),
          { location: null, value: blank.answer },
        ])
      );
    }

    if (draggedItem) {
      this.draggedItem = draggedItem;
    } else {
      this.draggedItem = null;
    }
  }

  gradeExercise() {
    const total = this.blanks.size;
    let correct = 0;
    Array.from(this.blanks).forEach(([key, blank]) => {
      const { answer, reply } = blank;
      if (answer === reply) correct++;
    });
    return (correct / total) * 100;
  }

  private resetLocalUserData() {
    this.userExerciseLocalRepository.saveUserActivityDataLocally({
      activityId: this.activityId,
      grade: this.gradeExercise(),
      exerciseData: null,
    });
  }

  saveUserDataLocally() {
    this.userExerciseLocalRepository.saveUserActivityDataLocally({
      activityId: this.activityId,
      grade: this.gradeExercise(),
      exerciseData: JSON.stringify({
        blanks: Array.from(this.blanks),
        boardItems: Array.from(this.boardItems),
      }),
    });
  }

  static withUserDataFrom(
    activityId: string,
    userExerciseLocalRepository: UserExerciseLocalRepository,
    answers: Map<string, string>
  ): { dndSetting: DndSetting; userData: boolean } {
    const localUserActivityData =
      userExerciseLocalRepository.getLocalUserActivityData({ activityId });

    if (localUserActivityData && localUserActivityData.exerciseData) {
      const exerciseData = JSON.parse(localUserActivityData.exerciseData);
      const localBlanks = new Map(exerciseData.blanks) as Map<string, Blank>;
      const localBoardItems = new Map(exerciseData.boardItems) as Map<
        string,
        BoardItem
      >;

      return {
        dndSetting: new DndSetting(
          activityId,
          userExerciseLocalRepository,
          localBlanks,
          localBoardItems
        ),
        userData: true,
      };
    }

    console.warn("no user data");
    const blanks: Map<string, Blank> = new Map(
      Array.from(answers, ([key, answer]) => [key, { answer, reply: null }])
    );
    return {
      dndSetting: new DndSetting(
        activityId,
        userExerciseLocalRepository,
        blanks
      ),
      userData: false,
    };
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
    this.resetLocalUserData();

    return new DndSetting(
      this.activityId,
      this.userExerciseLocalRepository,
      newBlanks,
      newBoardItems,
      null
    );
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
