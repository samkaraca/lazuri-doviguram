import IMultipleChoiceExercise from "./multiple_choice_exercise";

export function addNewQuestion(
  questionId: string,
  exercise: IMultipleChoiceExercise
): IMultipleChoiceExercise {
  const newTemplate = [
    ...exercise.template,
    {
      id: questionId,
      choices: ["", "", "", ""] as [string, string, string, string],
      questionText: "",
    },
  ];
  const newAnswers = [...exercise.answers, { id: questionId, value: "0" }];

  return {
    type: "multiple-choice-exercise",
    template: newTemplate,
    answers: newAnswers,
  };
}

export function changeChoiceText(
  questionId: string,
  choice: "0" | "1" | "2" | "3",
  newChoiceText: string,
  exercise: IMultipleChoiceExercise
): IMultipleChoiceExercise {
  const newTemplate = exercise.template.map((q) => {
    if (q.id !== questionId) return q;
    const newChoices = [...q.choices] as [string, string, string, string];
    newChoices[parseInt(choice)] = newChoiceText;
    return { ...q, choices: newChoices };
  });

  return {
    type: "multiple-choice-exercise",
    template: newTemplate,
    answers: exercise.answers,
  };
}

export function changeAnswer(
  questionId: string,
  newAnswer: "0" | "1" | "2" | "3",
  exercise: IMultipleChoiceExercise
): IMultipleChoiceExercise {
  const newAnswers = exercise.answers.map((q) => {
    if (q.id !== questionId) return q;
    return { ...q, value: newAnswer };
  });
  return {
    type: "multiple-choice-exercise",
    template: exercise.template,
    answers: newAnswers,
  };
}

export function removeQuestion(
  questionId: string,
  exercise: IMultipleChoiceExercise
): IMultipleChoiceExercise {
  const unit = exercise.template.find((u) => u.id === questionId);
  if (!unit) {
    throw Error("There is no such unit. AdminFIBEServices -> removeQuestion.");
  }
  const newTemplate = exercise.template.filter((p) => p.id !== questionId);
  const newAnswers = exercise.answers.filter((a) => a.id !== questionId);
  return {
    type: "multiple-choice-exercise",
    template: newTemplate,
    answers: newAnswers,
  };
}

export function changeQuestionText(
  questionId: string,
  newQuestionText: string,
  exercise: IMultipleChoiceExercise
): IMultipleChoiceExercise {
  const newTemplate = exercise.template.map((q) => {
    if (q.id !== questionId) return q;
    return { ...q, questionText: newQuestionText };
  });

  return {
    type: "multiple-choice-exercise",
    template: newTemplate,
    answers: exercise.answers,
  };
}
