import { DragIntoBlanksExercise } from "./drag_into_blanks_exercise";
import { ActivityBody } from "./layout/activity_body";
import { PairTextsWithImagesExercise } from "./pair_texts_with_images_exercise";
import { Activity as IActivity } from "@/lib/activity/activity";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";
import { SimpleExercise as ISimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { MultipleChoiceExercise as IMultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";
import { TypeInBlanksExercise } from "./type_in_blanks_exercise";
import { TrueFalseExercise } from "./true_false_exercise";
import { MultipleChoiceExercise } from "./multiple_choice_exercise";
import { LocalExerciseRepository } from "@/lib/exercises/local_exercise_repository";
import { LocalExerciseDTO } from "@/lib/exercises/local_exercise_dto";

export function Activity({
  activity,
  localData,
  saveLocalData,
  closeActivity,
}: {
  activity: IActivity;
  localData?: LocalExerciseDTO["data"];
  saveLocalData?: (data: any, grade: number) => void;
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
          localData={localData}
          saveLocalData={saveLocalData}
          closeActivity={closeActivity}
          exercise={exercise as ISimpleExercise}
        />
      ) : type === "type-in-blanks" ? (
        <TypeInBlanksExercise
          localData={localData}
          saveLocalData={saveLocalData}
          closeActivity={closeActivity}
          exercise={exercise as FillInBlanksExercise}
        />
      ) : type === "drag-into-blanks" ? (
        <DragIntoBlanksExercise
          localData={localData}
          saveLocalData={saveLocalData}
          closeActivity={closeActivity}
          exercise={exercise as FillInBlanksExercise}
        />
      ) : type === "multiple-choice" ? (
        <MultipleChoiceExercise
          localData={localData}
          saveLocalData={saveLocalData}
          closeActivity={closeActivity}
          exercise={exercise as IMultipleChoiceExercise}
        />
      ) : type === "pair-texts-with-images" ? (
        <PairTextsWithImagesExercise
          localData={localData}
          saveLocalData={saveLocalData}
          closeActivity={closeActivity}
          exercise={exercise as ISimpleExercise}
        />
      ) : null}
    </article>
  );
}
