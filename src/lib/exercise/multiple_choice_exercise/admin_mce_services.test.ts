import * as AdminMCEServices from "./admin_mce_services";
import IMultipleChoiceExercise from "./multiple_choice_exercise";

const sampleMultipleChoiceExercise = {
  type: "multiple-choice-exercise",
  answers: [
    { id: "1", value: "C" },
    { id: "2", value: "A" },
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
  ],
} as IMultipleChoiceExercise;

describe("admin multiple-choice-exercise services", () => {
  test("addNewQuestion()", () => {
    const exercise = AdminMCEServices.addNewQuestion(
      "id145",
      sampleMultipleChoiceExercise
    );
    expect(exercise).toStrictEqual({
      type: "multiple-choice-exercise",
      answers: [
        { id: "1", value: "C" },
        { id: "2", value: "A" },
        { id: "id145", value: "0" },
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
          id: "id145",
          choices: ["", "", "", ""],
          questionText: "",
        },
      ],
    });
  });
  test("changeChoiceText()", () => {
    const exercise = AdminMCEServices.changeChoiceText(
      "2",
      "2",
      "What a choice i am.",
      sampleMultipleChoiceExercise
    );
    expect(exercise).toStrictEqual({
      type: "multiple-choice-exercise",
      answers: [
        { id: "1", value: "C" },
        { id: "2", value: "A" },
      ],
      template: [
        {
          id: "1",
          choices: ["A", "B", "C", "D"],
          questionText: "Some sample question text?",
        },
        {
          id: "2",
          choices: ["A", "B", "What a choice i am.", "D"],
          questionText: "Some sample question text?",
        },
      ],
    });
  });
  test("changeAnswer()", () => {
    const exercise = AdminMCEServices.changeAnswer(
      "1",
      "3",
      sampleMultipleChoiceExercise
    );
    expect(exercise).toStrictEqual({
      type: "multiple-choice-exercise",
      answers: [
        { id: "1", value: "3" },
        { id: "2", value: "A" },
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
      ],
    });
  });
  test("removeQuestion()", () => {
    const exercise = AdminMCEServices.removeQuestion(
      "2",
      sampleMultipleChoiceExercise
    );
    expect(exercise).toStrictEqual({
      type: "multiple-choice-exercise",
      answers: [{ id: "1", value: "C" }],
      template: [
        {
          id: "1",
          choices: ["A", "B", "C", "D"],
          questionText: "Some sample question text?",
        },
      ],
    });
  });
  test("changeQuestionText()", () => {
    const exercise = AdminMCEServices.changeQuestionText(
      "1",
      "What what?",
      sampleMultipleChoiceExercise
    );
    expect(exercise).toStrictEqual({
      type: "multiple-choice-exercise",
      answers: [
        { id: "1", value: "C" },
        { id: "2", value: "A" },
      ],
      template: [
        {
          id: "1",
          choices: ["A", "B", "C", "D"],
          questionText: "What what?",
        },
        {
          id: "2",
          choices: ["A", "B", "C", "D"],
          questionText: "Some sample question text?",
        },
      ],
    });
  });
});
