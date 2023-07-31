import { Clear } from "@mui/icons-material";
import { IconButton, Input, List, ListItem } from "@mui/material";
import useViewModelContext from "@/features/activity_editor/view_model";
import { AddFab } from "@/core/components/add_fab";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { nanoid } from "nanoid";
import {
  addNewQuestion,
  changeQuestionText,
  joinFromTemplate,
  removeQuestion,
} from "@/lib/exercises/fibe_service";

export default function TypeOrDragExerciseForm() {
  const { fillInBlanksExercise, setFillInBlanksExercise } =
    useViewModelContext()!;

  return (
    <>
      <List>
        {fillInBlanksExercise.questions.map(({ id, rawQuestion }) => {
          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      setFillInBlanksExercise((prev) =>
                        removeQuestion(id, prev)
                      );
                    }}
                  >
                    <Clear color="error" />
                  </IconButton>
                }
              >
                <Input
                  fullWidth
                  style={{ marginRight: "1rem" }}
                  value={joinFromTemplate(rawQuestion)}
                  onChange={(e) =>
                    setFillInBlanksExercise((prev) =>
                      changeQuestionText(id, e.target.value, prev)
                    )
                  }
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <AddFab
        onClick={() =>
          setFillInBlanksExercise((prev) => addNewQuestion(nanoid(), prev))
        }
      />
    </>
  );
}
