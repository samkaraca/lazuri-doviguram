import { DragIntoBlanksExercise } from "./drag_into_blanks_exercise";
import { ActivityBody } from "./layout/activity_body";
import { PairTextsWithImagesExercise } from "./pair_texts_with_images_exercise";
import { Activity as IActivity } from "@/lib/activity/activity";
import {
  FillInBlanksExercise,
  FillInBlanksQuestion,
} from "@/lib/exercises/fill_in_blanks_exercise";
import { SimpleExercise as ISimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { MultipleChoiceExercise as IMultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";
import { TypeInBlanksExercise } from "./type_in_blanks_exercise";
import { TrueFalseExercise } from "./true_false_exercise";
import { MultipleChoiceExercise } from "./multiple_choice_exercise";

export function Activity({
  activity,
  closeActivity,
}: {
  activity: IActivity;
  closeActivity: VoidFunction;
}) {
  const {
    title,
    textContent,
    explanation,
    audio,
    image,
    youtubeVideoUrl,
    type,
    exercise,
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

      {type === "true-false" ? (
        <TrueFalseExercise
          closeActivity={closeActivity}
          exercise={exercise as ISimpleExercise}
        />
      ) : type === "type-in-blanks" ? (
        <TypeInBlanksExercise
          closeActivity={closeActivity}
          exercise={exercise as FillInBlanksExercise}
        />
      ) : type === "drag-into-blanks" ? /*<DragIntoBlanksExercise
          activityId={activityId}
          closeActivity={closeActivity}
          exercise={
            new FillInBlanksExercise("acId", [
              new FillInBlanksQuestion(
                "wq",
                new Map([["fs", { type: "blank", value: "bu ne" }]]),
                new Map()
              ),
              new FillInBlanksQuestion(
                "fd",
                new Map([["ms", { type: "blank", value: "işte bu" }]])
              ),
            ])
          }
        />*/
      null : type === "multiple-choice" ? (
        <MultipleChoiceExercise
          closeActivity={closeActivity}
          exercise={exercise as IMultipleChoiceExercise}
        />
      ) : type === "pair-texts-with-images" ? (
        <PairTextsWithImagesExercise
          closeActivity={closeActivity}
          exercise={exercise as ISimpleExercise}
        />
      ) : null}
    </article>
  );
}
