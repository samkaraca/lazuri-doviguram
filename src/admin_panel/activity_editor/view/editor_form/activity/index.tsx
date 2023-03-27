import { Paper } from "@mui/material";
import TrueOrFalseExercise from "./true_or_false_exercise";
import FillOrDragExercise from "./fill_or_drag_exercise";
import { IViewModel } from "@/admin_panel/activity_editor/model/view_model";
import { useViewModelContext } from "@/admin_panel/activity_editor/view_model";
import SelectiveConsumer from "@/core/components/selective_consumer";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["activityType"]}
      hook={() => viewModel}
      component={Activity}
    />
  );
}

function Activity(viewModel: IViewModel) {
  const { activityType } = viewModel;

  return (
    <Paper
      sx={{
        paddingBottom: "1rem",
        position: "relative",
        minHeight: "10rem",
        backgroundColor: "#dddddd",
      }}
      variant="outlined"
    >
      {activityType === "true-false" ? (
        <TrueOrFalseExercise />
      ) : (
        <FillOrDragExercise />
      )}
    </Paper>
  );
}
