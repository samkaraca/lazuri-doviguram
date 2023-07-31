import { Paper } from "@mui/material";
import TrueOrFalseExercise from "./true_false_exercise_form";
import FillOrDragExercise from "./type_or_drag_exercise_form";
import useViewModelContext from "@/features/activity_editor/view_model";
import { MultipleChoiceExerciseForm } from "./multiple_choice_exercise_form";
import { PairTextsWithImagesExerciseForm } from "./pair_texts_with_images_exercise_form";

export default function ExerciseEditor() {
  const { type } = useViewModelContext()!;

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
      {type === "true-false" ? (
        <TrueOrFalseExercise />
      ) : type === "type-in-blanks" || type === "drag-into-blanks" ? (
        <FillOrDragExercise />
      ) : type === "multiple-choice" ? (
        <MultipleChoiceExerciseForm />
      ) : type === "pair-texts-with-images" ? (
        <PairTextsWithImagesExerciseForm />
      ) : null}
    </Paper>
  );
}
