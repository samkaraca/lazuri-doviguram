import { Clear } from "@mui/icons-material";
import { IconButton, List, ListItem, TextField } from "@mui/material";
import useViewModelContext from "@/features/activity_editor/view_model";
import { AddFab } from "@/core/components/add_fab";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { nanoid } from "nanoid";
import * as AdminFIBEServices from "@/lib/exercise/fill_in_blanks_exercise/admin_fibe_services";

export default function TypeOrDragExerciseForm() {
  const viewModel = useViewModelContext()!;
  const { setExercise } = viewModel;
  const exercise = viewModel.exercise;

  return (
    <>
      <List>
        {exercise.template.map(({ id, atoms }) => {
          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      setExercise((prev) =>
                        AdminFIBEServices.removeQuestion(id, prev as any)
                      );
                    }}
                  >
                    <Clear color="error" />
                  </IconButton>
                }
              >
                <TextField
                  multiline
                  size="medium"
                  fullWidth
                  style={{ marginRight: "1rem" }}
                  value={AdminFIBEServices.formTextFromTemplate(
                    atoms,
                    exercise.answers
                  )}
                  onChange={(e) => {
                    setExercise((prev) =>
                      AdminFIBEServices.changeQuestionText(
                        id,
                        e.target.value,
                        prev as any,
                        nanoid
                      )
                    );
                  }}
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <AddFab
        onClick={() => {
          setExercise((prev) =>
            AdminFIBEServices.addNewQuestion(nanoid(), prev as any)
          );
        }}
      />
    </>
  );
}
