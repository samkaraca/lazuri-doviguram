import { useEffect, useState } from "react";
import { DragIntoBlanksExercise } from "./drag_into_blanks_exercise";
import { Layout } from "./layout";
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
import { DndSetting } from "@/core/models/entities/dnd_setting";

export function Activity({
  activity,
  closeActivity,
}: {
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
  const [isFormLocked, setIsFormLocked] = useState(false);
  const [resetSwitch, setResetSwitch] = useState(false);

  useEffect(() => {
    setResetSwitch((prev) => !prev);
  }, [activityType]);

  const handleFinishClick = () => {
    setIsFormLocked(true);
  };

  const handleReattemptClick = () => {
    setResetSwitch((prev) => !prev);
    setIsFormLocked(false);
  };

  return (
    <Layout
      title={title}
      textContent={textContent}
      explanation={explanation}
      audio={audio}
      image={image}
      youtubeVideoUrl={youtubeVideoUrl}
      isFormLocked={isFormLocked}
      handleReattemptClick={handleReattemptClick}
      handleFinishClick={handleFinishClick}
      closeActivity={closeActivity}
    >
      {activityType === "true-false" ? (
        <TrueFalseExercise
          resetSwitch={resetSwitch}
          isFormLocked={isFormLocked}
          exercise={questions as TrueFalseQuestion[]}
        />
      ) : activityType === "type-in-blanks" ? (
        <TypeInBlanksExercise
          resetSwitch={resetSwitch}
          isFormLocked={isFormLocked}
          exercise={questions as FillInBlanksQuestion[]}
        />
      ) : activityType === "drag-into-blanks" ? (
        <DragIntoBlanksExercise
          resetSwitch={resetSwitch}
          isFormLocked={isFormLocked}
          exercise={questions as FillInBlanksQuestion[]}
        />
      ) : activityType === "multiple-choice" ? (
        <MultipleChoiceExercise
          resetSwitch={resetSwitch}
          isFormLocked={isFormLocked}
          exercise={questions as MultipleChoiceQuestion[]}
        />
      ) : activityType === "pair-texts-with-images" ? (
        <PairTextsWithImagesExercise
          resetSwitch={resetSwitch}
          isFormLocked={isFormLocked}
          exercise={questions as SimpleQuestion[]}
        />
      ) : null}
    </Layout>
  );
}
