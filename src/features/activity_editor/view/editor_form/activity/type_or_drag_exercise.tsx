import { Clear } from "@mui/icons-material";
import { IconButton, Input, List, ListItem } from "@mui/material";
import useViewModelContext from "@/features/activity_editor/view_model";
import { AddFab } from "@/core/components/add_fab";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { FillInBlanksQuestion } from "@/core/models/entities/question";
import { nanoid } from "nanoid";

export default function FillOrDragActivity() {
  const { fillInBlanksExercise, setFillInBlanksExercise } =
    useViewModelContext()!;

  return (
    <>
      <List>
        {Array.from(fillInBlanksExercise, ([key, item]) => {
          const { question } = item;

          return (
            <ActivityListItemPaper key={key}>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() =>
                      setFillInBlanksExercise((prev) => {
                        const newExercise = new Map(prev);
                        newExercise.delete(key);
                        return newExercise;
                      })
                    }
                  >
                    <Clear color="error" />
                  </IconButton>
                }
              >
                <Input
                  fullWidth
                  sx={{ marginRight: "1.5rem" }}
                  value={question}
                  onChange={(e) =>
                    setFillInBlanksExercise((prev) => {
                      const newExercise = new Map(prev);
                      newExercise.set(
                        key,
                        new FillInBlanksQuestion(e.target.value)
                      );
                      return newExercise;
                    })
                  }
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <AddFab
        onClick={() => {
          setFillInBlanksExercise((prev) => {
            const newExercise = new Map(prev);
            newExercise.set(nanoid(), new FillInBlanksQuestion(""));
            return newExercise;
          });
        }}
      />
    </>
  );
}
