import IQAExercise from "./qa_exercise";

export const changeQuestionText = (
  questionId: string,
  newQuestionText: string,
  exercise: IQAExercise
): IQAExercise => {
  const newTemplate = exercise.template.map((q) => {
    if (q.id !== questionId) return q;
    return { id: q.id, questionText: newQuestionText };
  });

  return {
    type: "qa-exercise",
    template: newTemplate,
    answers: exercise.answers,
  };
};

export const removeQuestion = (
  questionId: string,
  exercise: IQAExercise
): IQAExercise => {
  const newAnswers = exercise.answers.filter((a) => a.id !== questionId);
  const newTemplate = exercise.template.filter((p) => p.id !== questionId);
  return {
    type: "qa-exercise",
    template: newTemplate,
    answers: newAnswers,
  };
};

export const changeAnswer = (
  questionId: string,
  newAnswer: string,
  exercise: IQAExercise
): IQAExercise => {
  const newAnswers = exercise.answers.map((q) => {
    if (q.id !== questionId) return q;
    return { ...q, value: newAnswer };
  });

  return {
    type: "qa-exercise",
    template: exercise.template,
    answers: newAnswers,
  };
};

export const addNewQuestion = (
  questionId: string,
  questionText: string,
  answer: string,
  exercise: IQAExercise
): IQAExercise => {
  const newAnswers = [
    ...exercise.answers,
    { id: questionId, value: answer },
  ] as IQAExercise["answers"];
  const newTemplate = [
    ...exercise.template,
    { id: questionId, questionText },
  ] as IQAExercise["template"];

  return {
    type: "qa-exercise",
    answers: newAnswers,
    template: newTemplate,
  };
};
