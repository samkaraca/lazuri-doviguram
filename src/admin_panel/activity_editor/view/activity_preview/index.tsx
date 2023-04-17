import { TrueOrFalseExercise } from "@/exercises/true_or_false_exercise";
import useViewModelContext from "../../view_model";
import { ActivityLayout } from "./activity_layout";
import { DragAndPairWithImagesExercise } from "@/exercises/drag_and_pair_with_images_exercise";
import { TypeInBlanksExercise } from "@/exercises/type_in_blanks_exercise";
import { DragIntoBlanksExercise } from "@/exercises/drag_into_blanks_exercise";

export function ActivityPreview() {
  const { activityType, trueOrFalseExercise, typeOrDragExercise } =
    useViewModelContext()!;

  return (
    <ActivityLayout>
      {activityType === "true-or-false" ? (
        <TrueOrFalseExercise exercise={trueOrFalseExercise} />
      ) : activityType === "drag-and-pair-with-images" ? (
        <DragAndPairWithImagesExercise exercise={[]} />
      ) : activityType === "type-in-blanks" ? (
        <TypeInBlanksExercise exercise={typeOrDragExercise} />
      ) : (
        <DragIntoBlanksExercise exercise={typeOrDragExercise} />
      )}
    </ActivityLayout>
  );
}
