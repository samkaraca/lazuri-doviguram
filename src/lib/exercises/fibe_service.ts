import { nanoid } from "nanoid";
import { Blank } from "../utils/dnd_setting/blank";
import DndSetting from "../utils/dnd_setting/dnd_setting";
import { Item } from "../utils/dnd_setting/item";
import {
  FillInBlanksExercise,
  FillInBlanksQuestion,
} from "./fill_in_blanks_exercise";

type Template = {
  id: string;
  type: "text" | "blank";
  value: string;
}[];

export function parseIntoTemplate(text: string): Template {
  return text.split(/{(.+?)}/g).map((value, i) => {
    if (i % 2 === 0) {
      return { id: nanoid(), type: "text", value };
    }
    return { id: nanoid(), type: "blank", value };
  });
}

export function joinFromTemplate(template: Template) {
  let text = "";
  template.forEach((e, i) => {
    if (i === 0) {
      text += e.value;
    } else if (i % 2 === 0) {
      text += `}${e.value}`;
    } else {
      text += `{${e.value}`;
    }
  });
  return text;
}

export const dndSettingFrom = (exercise: FillInBlanksExercise) => {
  const blanks = exercise.blanks.map((b) => new Blank(b.id, b.value, null));
  const board = exercise.blanks.map((b) => new Item(b.id, b.value));
  return new DndSetting(blanks, board, null);
};

export const addNewQuestion = (
  questionId: string,
  exercise: FillInBlanksExercise
) => {
  const newQuestions = [
    ...exercise.questions,
    new FillInBlanksQuestion(questionId, []),
  ];
  return new FillInBlanksExercise(newQuestions);
};

export const changeQuestionText = (
  questionId: string,
  newText: string,
  exercise: FillInBlanksExercise
) => {
  const newQuestions = exercise.questions.map((q) => {
    if (q.id !== questionId) return q;
    return new FillInBlanksQuestion(questionId, parseIntoTemplate(newText));
  });
  return new FillInBlanksExercise(newQuestions);
};

export const removeQuestion = (
  questionId: string,
  exercise: FillInBlanksExercise
) => {
  const newQuestions = exercise.questions.filter((q) => q.id !== questionId);
  return new FillInBlanksExercise(newQuestions);
};
