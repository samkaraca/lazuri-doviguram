import { Activity } from "@/core/models/entities/learning_unit";
import {
  FillInBlanksQuestion,
  MultipleChoiceQuestion,
  Question,
  SimpleQuestion,
  TrueFalseQuestion,
} from "@/core/models/entities/question";

type QuestionsWithType =
  | { activityType: "true-false"; questions: TrueFalseQuestion[] }
  | {
      activityType: "drag-into-blanks" | "type-in-blanks";
      questions: FillInBlanksQuestion[];
    }
  | { activityType: "multiple-choice"; questions: MultipleChoiceQuestion[] }
  | { activityType: "true-false"; questions: TrueFalseQuestion[] }
  | { activityType: "pair-texts-with-images"; questions: SimpleQuestion[] };

export class ExerciseConverter {
  fromMap({
    activityType,
    fillInBlanksExercise,
    multipleChoiceExercise,
    simpleExercise,
    trueFalseExercise,
  }: {
    activityType: Activity<any>["activityType"];
    fillInBlanksExercise: Map<string, FillInBlanksQuestion>;
    multipleChoiceExercise: Map<string, MultipleChoiceQuestion>;
    trueFalseExercise: Map<string, TrueFalseQuestion>;
    simpleExercise: Map<string, SimpleQuestion>;
  }): QuestionsWithType {
    let result: QuestionsWithType = {
      activityType: "true-false",
      questions: [] as TrueFalseQuestion[],
    };

    if (
      activityType === "drag-into-blanks" ||
      activityType === "type-in-blanks"
    ) {
      result = {
        ...result,
        activityType,
        questions: Array.from(fillInBlanksExercise, ([key, value]) =>
          FillInBlanksQuestion.from(value)
        ),
      };
    } else if (activityType === "multiple-choice") {
      result = {
        ...result,
        activityType,
        questions: Array.from(multipleChoiceExercise).map(([key, value]) =>
          MultipleChoiceQuestion.from(value)
        ),
      };
    } else if (activityType === "true-false") {
      result = {
        ...result,
        activityType,
        questions: Array.from(trueFalseExercise).map(([key, value]) =>
          TrueFalseQuestion.from(value)
        ),
      };
    } else if (activityType === "pair-texts-with-images") {
      result = {
        ...result,
        activityType,
        questions: Array.from(simpleExercise).map(([key, value]) =>
          SimpleQuestion.from(value)
        ),
      };
    }

    return result;
  }
}
