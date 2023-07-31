import { nanoid } from "nanoid";
import { Blank } from "../utils/dnd_setting/blank";
import DndSetting from "../utils/dnd_setting/dnd_setting";
import { Item } from "../utils/dnd_setting/item";
import { SimpleExercise, SimpleQuestion } from "./simple_question_exercise";

export const dndSettingFrom = (exercise: SimpleExercise) => {
  const blanks = exercise.questions.map(
    (question) => new Blank(question.id, question.answer, null)
  );
  const board = exercise.questions.map(
    (question) => new Item(question.id, question.answer)
  );
  return new DndSetting(blanks, board, null);
};

export const changeQuestionText = (
  questionId: string,
  newText: string,
  exercise: SimpleExercise
) => {
  const newQuestions = exercise.questions.map((q) => {
    if (q.id !== questionId) return q;
    return new SimpleQuestion(q.id, newText, q.answer);
  });
  return new SimpleExercise(newQuestions);
};

export const removeQuestion = (
  questionId: string,
  exercise: SimpleExercise
) => {
  const newQuestions = exercise.questions.filter((q) => q.id !== questionId);
  return new SimpleExercise(newQuestions);
};

export const changeAnswer = (
  questionId: string,
  newAnswer: string,
  exercise: SimpleExercise
) => {
  const newQuestions = exercise.questions.map((q) => {
    if (q.id !== questionId) return q;
    return new SimpleQuestion(q.id, q.question, newAnswer);
  });
  return new SimpleExercise(newQuestions);
};

export const addNewQuestion = (
  questionId: string,
  defaultAnswer: string,
  exercise: SimpleExercise
) => {
  const newQuestions = [
    ...exercise.questions,
    new SimpleQuestion(questionId, "", defaultAnswer),
  ];
  return new SimpleExercise(newQuestions);
};
