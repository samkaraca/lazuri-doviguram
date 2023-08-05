import IAnswer from "../answer";
import IFillInBlanksExercise from "./fill_in_blanks_exercise";
import IFillInBlanksExerciseUnit from "./fill_in_blanks_exercise_unit";

export function parseIntoTemplate(
  text: string,
  idGenerator: () => string
): [IFillInBlanksExerciseUnit["atoms"], IAnswer[]] {
  const atoms = [] as IFillInBlanksExerciseUnit["atoms"];
  const answers = [] as IAnswer[];
  text.split(/{(.+?)}/g).forEach((value, i) => {
    const atomId = idGenerator();
    if (i % 2 === 0) {
      atoms.push({ id: atomId, type: "text", value });
      return;
    }
    answers.push({ id: atomId, value });
    atoms.push({ id: atomId, type: "blank" });
  });
  return [atoms, answers];
}

export const formTextFromTemplate = (
  atoms: IFillInBlanksExerciseUnit["atoms"],
  answers: IAnswer[]
): string => {
  let text = "";
  atoms.map((atom) => {
    if (atom.type === "text") {
      text += atom.value;
    } else if (atom.type === "blank") {
      const answer = answers.find((a) => a.id === atom.id);
      if (!answer) {
        throw Error(
          "There is no such ansmwer. AdminFIBEServices -> formTextFromTemplate."
        );
      }
      text += `{${answer.value}}`;
    }
  });
  return text;
};

export const addNewQuestion = (
  questionId: string,
  exercise: IFillInBlanksExercise
): IFillInBlanksExercise => {
  const newTemplate = [...exercise.template, { id: questionId, atoms: [] }];
  return {
    type: "fill-in-blanks-exercise",
    answers: exercise.answers,
    template: newTemplate,
  };
};

export const changeQuestionText = (
  questionId: string,
  newText: string,
  exercise: IFillInBlanksExercise,
  idGenerator: () => string
): IFillInBlanksExercise => {
  const unitBlankIds = blankIdsOfUnit(safelyFindUnit(questionId, exercise));
  const cleanedAnswers = exercise.answers.filter(
    (a) => !unitBlankIds.includes(a.id)
  );

  const [additionalAtoms, additionalAnswers] = parseIntoTemplate(
    newText,
    idGenerator
  );
  const newTemplate = exercise.template.map((e) => {
    if (e.id !== questionId) return e;
    return { ...e, atoms: additionalAtoms };
  });
  const newAnswers = [...cleanedAnswers, ...additionalAnswers];

  return {
    template: newTemplate,
    answers: newAnswers,
    type: "fill-in-blanks-exercise",
  };
};

export const removeQuestion = (
  questionId: string,
  exercise: IFillInBlanksExercise
): IFillInBlanksExercise => {
  const unitBlankIds = blankIdsOfUnit(safelyFindUnit(questionId, exercise));
  const answers = exercise.answers.filter((a) => !unitBlankIds.includes(a.id));
  const template = exercise.template.filter((e) => e.id !== questionId);
  return {
    answers,
    template,
    type: exercise.type,
  };
};

const safelyFindUnit = (
  unitId: string,
  exercise: IFillInBlanksExercise
): IFillInBlanksExerciseUnit => {
  const unit = exercise.template.find((u) => u.id === unitId);
  if (!unit) {
    throw Error("There is no such unit. AdminFIBEServices -> safelyFindUnit.");
  }
  return unit;
};

const blankIdsOfUnit = (unit: IFillInBlanksExerciseUnit): string[] => {
  return unit.atoms.filter((a) => a.type === "blank").map((e) => e.id);
};
