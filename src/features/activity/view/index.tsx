import { ReactNode } from "react";
import useViewModelContext from "../view_model";
import { DragIntoBlanksExercise } from "./drag_into_blanks_exercise";
import { ActivityBody } from "./layout/activity_body";
import { ActivityFooter } from "./layout/activity_footer";
import { MultipleChoiceExercise } from "./multiple_choice_exercise";
import { PairTextsWithImagesExercise } from "./pair_texts_with_images_exercise";
import { TrueFalseExercise } from "./true_false_exercise";
import { TypeInBlanksExercise } from "./type_in_blanks_exercise";
import activityStyles from "../activity.module.scss";

export function View() {
  return (
    <article style={{ overflow: "hidden" }}>
      <ActivityBody />
      <Exercise />
      <ActivityFooter />
    </article>
  );
}

export function Exercise() {
  const { activityData } = useViewModelContext()!;
  const { type } = activityData;
  let exercise: ReactNode = null;

  if (type === "true-false") {
    exercise = <TrueFalseExercise />;
  }

  if (type === "drag-into-blanks") {
    exercise = <DragIntoBlanksExercise />;
  }

  if (type === "multiple-choice") {
    exercise = <MultipleChoiceExercise />;
  }

  if (type === "pair-texts-with-images") {
    exercise = <PairTextsWithImagesExercise />;
  }

  if (type === "type-in-blanks") {
    exercise = <TypeInBlanksExercise />;
  }

  return (
    <article className={activityStyles["exercise-body"]}>{exercise}</article>
  );
}
