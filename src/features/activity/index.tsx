import { useEffect, useState } from "react";
import { DragIntoBlanksExercise } from "./drag_into_blanks_exercise";
import { ActivityBody } from "./layout/activity_body";
import { MultipleChoiceExercise } from "./multiple_choice_exercise";
import { PairTextsWithImagesExercise } from "./pair_texts_with_images_exercise";
import { TrueFalseExercise } from "./true_false_exercise";
import { TypeInBlanksExercise } from "./type_in_blanks_exercise";
import { Activity as IActivity } from "@/core/models/entities/learning_unit";
import {
  FillInBlanksQuestion,
  MultipleChoiceQuestion,
  SimpleQuestion,
  TrueFalseQuestion,
} from "@/core/models/entities/question";

export function Activity({
  activityId,
  activity,
  closeActivity,
}: {
  activityId: string;
  activity: IActivity<any>;
  closeActivity: VoidFunction;
}) {
  const {
    title,
    textContent,
    explanation,
    audio,
    image,
    youtubeVideoUrl,
    activityType,
    questions,
  } = activity;

  return (
    <article>
      <ActivityBody
        title={title}
        textContent={textContent}
        explanation={explanation}
        audio={audio}
        image={image}
        youtubeVideoUrl={youtubeVideoUrl}
      />

      {activityType === "true-false" ? (
        <TrueFalseExercise
          closeActivity={closeActivity}
          activityId={activityId}
          exercise={questions as TrueFalseQuestion[]}
        />
      ) : activityType === "type-in-blanks" ? (
        <TypeInBlanksExercise
          closeActivity={closeActivity}
          activityId={activityId}
          exercise={questions as FillInBlanksQuestion[]}
        />
      ) : activityType === "drag-into-blanks" ? (
        <DragIntoBlanksExercise
          activityId={activityId}
          closeActivity={closeActivity}
          exercise={questions as FillInBlanksQuestion[]}
        />
      ) : activityType === "multiple-choice" ? (
        <MultipleChoiceExercise
          activityId={activityId}
          closeActivity={closeActivity}
          exercise={questions as MultipleChoiceQuestion[]}
        />
      ) : activityType === "pair-texts-with-images" ? (
        <PairTextsWithImagesExercise
          activityId={activityId}
          closeActivity={closeActivity}
          exercise={questions as SimpleQuestion[]}
        />
      ) : null}
    </article>
  );
}
