import IAnswer from "../answer";
import * as AdminFIBEServices from "./admin_fibe_services";
import IFillInBlanksExercise from "./fill_in_blanks_exercise";
import IFillInBlanksExerciseUnit from "./fill_in_blanks_exercise_unit";

const sampleFillInBlanksExercise = {
  type: "fill-in-blanks-exercise",
  answers: [{ id: "1B", value: "are" }],
  template: [
    {
      id: "1",
      atoms: [
        { id: "1A", type: "text", value: "How" },
        { id: "1B", type: "blank" },
        { id: "1C", type: "text", value: "you?" },
      ],
    },
  ],
} as IFillInBlanksExercise;

describe("admin fill-in-blanks-exercise services", () => {
  test("parseIntoTemplate()", () => {
    const sampleText1 = "What {are} you {doing}?";
    const sampleText2 = "what's {up}";
    const [atoms1, answers1] = AdminFIBEServices.parseIntoTemplate(
      sampleText1,
      () => Math.random().toString()
    );
    const [atoms2, answers2] = AdminFIBEServices.parseIntoTemplate(
      sampleText2,
      () => Math.random().toString()
    );
    const expectedAtoms1 = [
      { id: expect.anything(), type: "text", value: "What " },
      { id: expect.anything(), type: "blank" },
      { id: expect.anything(), type: "text", value: " you " },
      { id: expect.anything(), type: "blank" },
      { id: expect.anything(), type: "text", value: "?" },
    ] as IFillInBlanksExerciseUnit["atoms"];
    const expectedAnswers1 = [
      { id: expect.anything(), value: "are" },
      { id: expect.anything(), value: "doing" },
    ] as IAnswer[];
    const expectedAtoms2 = [
      { id: expect.anything(), type: "text", value: "what's " },
      { id: expect.anything(), type: "blank" },
      { id: expect.anything(), type: "text", value: "" },
    ] as IFillInBlanksExerciseUnit["atoms"];
    const expectedAnswers2 = [
      { id: expect.anything(), value: "up" },
    ] as IAnswer[];

    expect(atoms1).toStrictEqual(expectedAtoms1);
    expect(answers1).toStrictEqual(expectedAnswers1);
    expect(atoms1[1].id).toBe(answers1[0].id);
    expect(atoms1[3].id).toBe(answers1[1].id);

    expect(atoms2).toStrictEqual(expectedAtoms2);
    expect(answers2).toStrictEqual(expectedAnswers2);
    expect(atoms2[1].id).toBe(answers2[0].id);
  });
  test("formTextFromTemplate()", () => {
    const text = AdminFIBEServices.formTextFromTemplate(
      sampleFillInBlanksExercise.template[0].atoms,
      sampleFillInBlanksExercise.answers
    );
    expect(text).toBe("How{are}you?");
  });
  test("addNewQuestion()", () => {
    const exercise = AdminFIBEServices.addNewQuestion(
      "id123",
      sampleFillInBlanksExercise
    );
    expect(exercise).toStrictEqual({
      type: "fill-in-blanks-exercise",
      answers: [{ id: "1B", value: "are" }],
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
          id: "id123",
          atoms: [],
        },
      ],
    });
  });
  test("changeQuestionText()", () => {
    const exercise = AdminFIBEServices.changeQuestionText(
      "1",
      "what's {up}",
      sampleFillInBlanksExercise,
      () => Math.random().toString()
    );

    expect(exercise).toStrictEqual({
      type: "fill-in-blanks-exercise",
      answers: [{ id: expect.anything(), value: "up" }],
      template: [
        {
          id: "1",
          atoms: [
            { id: expect.anything(), type: "text", value: "what's " },
            { id: expect.anything(), type: "blank" },
            { id: expect.anything(), type: "text", value: "" },
          ],
        },
      ],
    });
    expect(exercise.template[0].atoms[1].id).toBe(exercise.answers[0].id);
  });
  test("removeQuestion()", () => {
    const exercise = AdminFIBEServices.removeQuestion(
      "1",
      sampleFillInBlanksExercise
    );
    expect(exercise).toStrictEqual({
      type: "fill-in-blanks-exercise",
      answers: [],
      template: [],
    });
  });
});
