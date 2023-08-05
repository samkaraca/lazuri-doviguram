import IFillInBlanksExercise from "@/lib/exercise/fill_in_blanks_exercise/fill_in_blanks_exercise";
import * as DndService from "./dnd_service";

describe("dnd_service module", () => {
  describe("stopDragging()", () => {
    const board = [
      { id: "1", value: "A" },
      { id: "2", value: "B" },
    ];
    const blanks = [
      { id: "7", value: "C" },
      { id: "8", value: "D" },
      { id: "9", value: null },
    ];
    test("case item picked FROM BOARD dropped on an EMPTY BLANK", () => {
      const draggedItem = { id: "1", value: "A" };
      const action = { type: "on-blank", blankId: "9" };
      const dndSetting = DndService.stopDragging(
        { board, blanks, draggedItem },
        action as any
      );
      expect(dndSetting.board).toStrictEqual([{ id: "2", value: "B" }]);
      expect(dndSetting.blanks).toStrictEqual([
        { id: "7", value: "C" },
        { id: "8", value: "D" },
        { id: "9", value: "A" },
      ]);
    });
    test("case item picked FROM BOARD dropped on an OCCUPIED BLANK", () => {
      const draggedItem = { id: "1", value: "A" };
      const action = { type: "on-blank", blankId: "8" };
      const dndSetting = DndService.stopDragging(
        { board, blanks, draggedItem },
        action as any
      );
      expect(dndSetting.board).toStrictEqual([
        { id: "2", value: "B" },
        { id: expect.stringMatching(/^.{7}$/), value: "D" },
      ]);
      expect(dndSetting.blanks).toStrictEqual([
        { id: "7", value: "C" },
        { id: "8", value: "A" },
        { id: "9", value: null },
      ]);
    });
    test("case item picked FROM BLANKS dropped on the SAME BLANK", () => {
      const draggedItem = { id: "8", value: "D" };
      const action = { type: "on-blank", blankId: "8" };
      const dndSetting = DndService.stopDragging(
        { board, blanks, draggedItem },
        action as any
      );
      expect(dndSetting.board).toStrictEqual([
        { id: "1", value: "A" },
        { id: "2", value: "B" },
      ]);
      expect(dndSetting.blanks).toStrictEqual([
        { id: "7", value: "C" },
        { id: "8", value: "D" },
        { id: "9", value: null },
      ]);
    });
    test("case item picked FROM BLANKS dropped on a DIFFERENT BLANK", () => {
      const draggedItem = { id: "8", value: "D" };
      const action = { type: "on-blank", blankId: "7" };
      const dndSetting = DndService.stopDragging(
        { board, blanks, draggedItem },
        action as any
      );
      expect(dndSetting.board).toStrictEqual([
        { id: "1", value: "A" },
        { id: "2", value: "B" },
        { id: expect.stringMatching(/^.{7}$/), value: "C" },
      ]);
      expect(dndSetting.blanks).toStrictEqual([
        { id: "7", value: "D" },
        { id: "8", value: null },
        { id: "9", value: null },
      ]);
    });
    test("case item picked FROM BOARD dropped on SPACE", () => {
      const draggedItem = { id: "1", value: "A" };
      const action = { type: "on-space" };
      const dndSetting = DndService.stopDragging(
        { board, blanks, draggedItem },
        action as any
      );
      expect(dndSetting.board).toStrictEqual([
        { id: "2", value: "B" },
        { id: expect.stringMatching(/^.{7}$/), value: "A" },
      ]);
      expect(dndSetting.blanks).toStrictEqual([
        { id: "7", value: "C" },
        { id: "8", value: "D" },
        { id: "9", value: null },
      ]);
    });
    test("case item picked FROM BLANKS dropped on SPACE", () => {
      const draggedItem = { id: "8", value: "D" };
      const action = { type: "on-space" };
      const dndSetting = DndService.stopDragging(
        { board, blanks, draggedItem },
        action as any
      );
      expect(dndSetting.board).toStrictEqual([
        { id: "1", value: "A" },
        { id: "2", value: "B" },
        { id: expect.stringMatching(/^.{7}$/), value: "D" },
      ]);
      expect(dndSetting.blanks).toStrictEqual([
        { id: "7", value: "C" },
        { id: "8", value: null },
        { id: "9", value: null },
      ]);
    });
  });
  describe("boardFrom()", () => {
    const sampleFillInBlanksExercise = {
      type: "fill-in-blanks-exercise",
      answers: [
        { id: "1B", value: "are" },
        { id: "2B", value: "is" },
        { id: "2D", value: "going?" },
      ],
      template: [
        {
          id: "1",
          atoms: [
            { id: "1A", type: "text", value: "How" },
            { id: "1B", type: "blank" },
            { id: "1C", type: "text", value: "you?" },
          ],
        },
        {
          id: "2",
          atoms: [
            { id: "2A", type: "text", value: "Where" },
            { id: "2B", type: "blank" },
            { id: "2C", type: "text", value: "he" },
            { id: "2D", type: "text" },
          ],
        },
      ],
    } as IFillInBlanksExercise;
    const sampleReplies = [
      { id: "1B", value: null },
      { id: "2B", value: "is" },
      { id: "2D", value: "are" },
    ];

    const board = DndService.boardFrom(
      sampleFillInBlanksExercise,
      sampleReplies
    );
    expect(board).toStrictEqual([{ id: expect.anything(), value: "going?" }]);
  });
});
