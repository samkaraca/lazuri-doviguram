import * as AdminQAEServices from "./admin_qae_services";
import IQAExercise from "./qa_exercise";

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

describe("admin qa-exercise services", () => {
  test("changeQuestionText()", () => {
    const exercise = AdminQAEServices.changeQuestionText(
      "2",
      "A winter fruit?",
      sampleQAExercise
    );
    expect(exercise).toStrictEqual({
      type: "qa-exercise",
      answers: [
        { id: "1", value: "Apple" },
        { id: "2", value: "Orange" },
      ],
      template: [
        { id: "1", questionText: "A red rounded fruit?" },
        { id: "2", questionText: "A winter fruit?" },
      ],
    });
  });
  test("removeQuestion()", () => {
    const exercise = AdminQAEServices.removeQuestion("1", sampleQAExercise);
    expect(exercise).toStrictEqual({
      type: "qa-exercise",
      answers: [{ id: "2", value: "Orange" }],
      template: [{ id: "2", questionText: "An orange colored fruit?" }],
    });
  });
  test("changeAnswer()", () => {
    const exercise = AdminQAEServices.changeAnswer(
      "1",
      "Peach",
      sampleQAExercise
    );
    expect(exercise).toStrictEqual({
      type: "qa-exercise",
      answers: [
        { id: "1", value: "Peach" },
        { id: "2", value: "Orange" },
      ],
      template: [
        { id: "1", questionText: "A red rounded fruit?" },
        { id: "2", questionText: "An orange colored fruit?" },
      ],
    });
  });
  test("addNewQuestion()", () => {
    const exercise = AdminQAEServices.addNewQuestion(
      "id157",
      "A giant watery summer fruit?",
      "Watermelon",
      sampleQAExercise
    );
    expect(exercise).toStrictEqual({
      type: "qa-exercise",
      answers: [
        { id: "1", value: "Apple" },
        { id: "2", value: "Orange" },
        { id: "id157", value: "Watermelon" },
      ],
      template: [
        { id: "1", questionText: "A red rounded fruit?" },
        { id: "2", questionText: "An orange colored fruit?" },
        { id: "id157", questionText: "A giant watery summer fruit?" },
      ],
    });
  });
});
