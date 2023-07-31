import {
  MultipleChoiceExercise,
  MultipleChoiceQuestion,
} from "./multiple_choice_exercise";

export function addNewQuestion(
  questionId: string,
  exercise: MultipleChoiceExercise
) {
  const newQuestions = [
    ...exercise.questions,
    new MultipleChoiceQuestion(questionId, "", ["", "", "", ""], 0),
  ];
  return new MultipleChoiceExercise(newQuestions);
}

export const changeChoiceText = (
  questionId: string,
  choiceIndex: 0 | 1 | 2 | 3,
  newText: string,
  exercise: MultipleChoiceExercise
) => {
  const newQuestions = exercise.questions.map((q) => {
    if (q.id !== questionId) return q;
    const newChoices = [...q.choices];
    newChoices[choiceIndex] = newText;
    return { ...q, choices: newChoices } as any;
  });
  return new MultipleChoiceExercise(newQuestions);
};

export const changeAnswer = (
  questionId: string,
  answer: 0 | 1 | 2 | 3,
  exercise: MultipleChoiceExercise
) => {
  const newQuestions = exercise.questions.map((q) => {
    if (q.id !== questionId) return q;
    return { ...q, answer };
  });
  return new MultipleChoiceExercise(newQuestions);
};

export const removeQuestion = (
  questionId: string,
  exercise: MultipleChoiceExercise
) => {
  const newQuestions = exercise.questions.filter((q) => q.id !== questionId);
  return new MultipleChoiceExercise(newQuestions);
};

export const changeQuestionText = (
  questionId: string,
  newText: string,
  exercise: MultipleChoiceExercise
) => {
  const newQuestions = exercise.questions.map((q) => {
    if (q.id !== questionId) return q;
    return { ...q, question: newText };
  });
  return new MultipleChoiceExercise(newQuestions);
};
