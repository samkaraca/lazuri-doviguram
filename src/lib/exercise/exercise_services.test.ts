import IFillInBlanksExercise from "./fill_in_blanks_exercise/fill_in_blanks_exercise";
import * as ExerciseServices from "@/lib/exercise/exercise_services";
import IMultipleChoiceExercise from "./multiple_choice_exercise/multiple_choice_exercise";
import IQAExercise from "./qa_exercise/qa_exercise";
import IReply from "./reply";

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

const sampleMultipleChoiceExercise = {
  type: "multiple-choice-exercise",
  answers: [
    { id: "1", value: "C" },
    { id: "2", value: "A" },
    { id: "3", value: "D" },
  ],
  template: [
    {
      id: "1",
      choices: ["A", "B", "C", "D"],
      questionText: "Some sample question text?",
    },
    {
      id: "2",
      choices: ["A", "B", "C", "D"],
      questionText: "Some sample question text?",
    },
    {
      id: "3",
      choices: ["A", "B", "C", "D"],
      questionText: "Some sample question text?",
    },
  ],
} as IMultipleChoiceExercise;

const sampleQAExercise = {
  type: "qa-exercise",
  answers: [
    { id: "1", value: "Apple" },
    { id: "2", value: "Orange" },
  ],
  template: [
    { id: "1", questionText: "A red rounded fruit?" },
    { id: "2", questionText: "An orange colored fruit?" },
  ],
} as IQAExercise;

describe("exercise services", () => {
  describe("for fill-in-blanks-exercise", () => {
    const replies1 = [
      { id: "1B", value: "are" },
      { id: "2B", value: "is" },
      { id: "2D", value: "going?" },
    ] as IReply[];
    const replies2 = [
      { id: "1B", value: null },
      { id: "2B", value: "is" },
      { id: "2D", value: "y?" },
    ] as IReply[];
    test("getGrade()", () => {
      const grade1 = ExerciseServices.getGrade(
        sampleFillInBlanksExercise,
        replies1
      );
      const grade2 = ExerciseServices.getGrade(
        sampleFillInBlanksExercise,
        replies2
      );
      expect(grade1).toBe(100);
      expect(grade2).toBe(Math.round(100 / 3));
    });
    test("reply()", () => {
      const newReplies1 = ExerciseServices.reply(
        "2B",
        "new sample reply",
        replies2
      );
      const newReplies2 = ExerciseServices.reply(
        "1B",
        "another reply",
        replies2
      );
      expect(newReplies1).toStrictEqual([
        { id: "1B", value: null },
        { id: "2B", value: "new sample reply" },
        { id: "2D", value: "y?" },
      ]);
      expect(newReplies2).toStrictEqual([
        { id: "1B", value: "another reply" },
        { id: "2B", value: "is" },
        { id: "2D", value: "y?" },
      ]);
    });
    test("getRrepliesTemplate()", () => {
      const repliesTemplate = ExerciseServices.getRrepliesTemplate(
        sampleFillInBlanksExercise
      );
      expect(repliesTemplate).toStrictEqual([
        { id: "1B", value: null },
        { id: "2B", value: null },
        { id: "2D", value: null },
      ]);
    });
    test("getReply()", () => {
      const reply1 = ExerciseServices.getReply("1B", replies2);
      const reply2 = ExerciseServices.getReply("2D", replies2);
      expect(reply1).toStrictEqual({ id: "1B", value: null });
      expect(reply2).toStrictEqual({ id: "2D", value: "y?" });
    });
    test("checkReply()", () => {
      const isCorrect1 = ExerciseServices.checkReply(
        "1B",
        sampleFillInBlanksExercise,
        replies2
      );
      const isCorrect2 = ExerciseServices.checkReply(
        "2B",
        sampleFillInBlanksExercise,
        replies2
      );
      const isCorrect3 = ExerciseServices.checkReply(
        "2D",
        sampleFillInBlanksExercise,
        replies2
      );
      expect(isCorrect1).toBe(false);
      expect(isCorrect2).toBe(true);
      expect(isCorrect3).toBe(false);
    });
  });
  describe("for multiple-choice-exercise", () => {
    const replies1 = [
      { id: "1", value: null },
      { id: "2", value: null },
      { id: "3", value: "E" },
    ];
    const replies2 = [
      { id: "1", value: "C" },
      { id: "2", value: null },
      { id: "3", value: "D" },
    ];
    test("grade()", () => {
      const grade1 = ExerciseServices.getGrade(
        sampleMultipleChoiceExercise,
        replies1
      );
      const grade2 = ExerciseServices.getGrade(
        sampleMultipleChoiceExercise,
        replies2
      );
      expect(grade1).toBe(0);
      expect(grade2).toBe(Math.round((100 * 2) / 3));
    });
    test("reply()", () => {
      const newReplies1 = ExerciseServices.reply("3", "A", replies1);
      expect(newReplies1).toStrictEqual([
        { id: "1", value: null },
        { id: "2", value: null },
        { id: "3", value: "A" },
      ]);
    });
    test("getRrepliesTemplate()", () => {
      const repliesTemplate = ExerciseServices.getRrepliesTemplate(
        sampleMultipleChoiceExercise
      );
      expect(repliesTemplate).toStrictEqual([
        { id: "1", value: null },
        { id: "2", value: null },
        { id: "3", value: null },
      ]);
    });
    test("getReply()", () => {
      const reply1 = ExerciseServices.getReply("2", replies1);
      expect(reply1).toStrictEqual({ id: "2", value: null });
    });
    test("checkReply()", () => {
      const isCorrect1 = ExerciseServices.checkReply(
        "1",
        sampleMultipleChoiceExercise,
        replies2
      );
      const isCorrect2 = ExerciseServices.checkReply(
        "3",
        sampleMultipleChoiceExercise,
        replies2
      );
      expect(isCorrect1).toBe(true);
      expect(isCorrect2).toBe(true);
    });
  });
  describe("for qa-exercise", () => {
    const replies1 = [
      { id: "1", value: "Banana" },
      { id: "2", value: "Orange" },
    ];
    const replies2 = [
      { id: "1", value: "Apple" },
      { id: "2", value: null },
    ];
    test("grade()", () => {
      const grade1 = ExerciseServices.getGrade(sampleQAExercise, replies1);
      const grade2 = ExerciseServices.getGrade(sampleQAExercise, replies2);
      expect(grade1).toBe(50);
      expect(grade2).toBe(50);
    });
    test("reply()", () => {
      const newReplies1 = ExerciseServices.reply("2", "Orange", replies2);
      expect(newReplies1).toStrictEqual([
        { id: "1", value: "Apple" },
        { id: "2", value: "Orange" },
      ]);
    });
    test("getRrepliesTemplate()", () => {
      const repliesTemplate =
        ExerciseServices.getRrepliesTemplate(sampleQAExercise);
      expect(repliesTemplate).toStrictEqual([
        { id: "1", value: null },
        { id: "2", value: null },
      ]);
    });
    test("getReply()", () => {
      const reply1 = ExerciseServices.getReply("1", replies1);
      const reply2 = ExerciseServices.getReply("2", replies2);
      expect(reply1).toStrictEqual({ id: "1", value: "Banana" });
      expect(reply2).toStrictEqual({ id: "2", value: null });
    });
    test("checkReply()", () => {
      const isCorrect1 = ExerciseServices.checkReply(
        "1",
        sampleQAExercise,
        replies1
      );
      const isCorrect2 = ExerciseServices.checkReply(
        "1",
        sampleQAExercise,
        replies2
      );
      expect(isCorrect1).toBe(false);
      expect(isCorrect2).toBe(true);
    });
  });
});
