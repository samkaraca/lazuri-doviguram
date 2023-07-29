import { Paper } from "@mui/material";
import TrueOrFalseExercise from "./true_false_exercise_form";
import FillOrDragExercise from "./type_or_drag_exercise_form";
import useViewModelContext from "@/features/activity_editor/view_model";
import { MultipleChoiceExerciseForm } from "./multiple_choice_exercise_form";
import { PairTextsWithImagesExerciseForm } from "./pair_texts_with_images_exercise_form";

export default function ExerciseEditor() {
  const { activityType } = useViewModelContext()!;

  return (
    <Paper
      sx={{
        position: "relative",
        minHeight: "10rem",
        backgroundColor: "#dddddd",
        padding: "1.5rem",
        paddingBottom: "2rem",
      }}
      variant="outlined"
    >
      {activityType === "true-false" ? (
        <TrueOrFalseExercise />
      ) : activityType === "type-in-blanks" ||
        activityType === "drag-into-blanks" ? (
        <FillOrDragExercise />
      ) : activityType === "multiple-choice" ? (
        <MultipleChoiceExerciseForm />
      ) : activityType === "pair-texts-with-images" ? (
        <PairTextsWithImagesExerciseForm />
      ) : null}
    </Paper>
  );
}
