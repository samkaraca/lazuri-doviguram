import { Clear } from "@mui/icons-material";
import { IconButton, Input, List, ListItem } from "@mui/material";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { useViewModelContext } from "@/admin_panel/activity_editor/view_model";
import { IViewModel } from "@/admin_panel/activity_editor/model/view_model";
import { AddFab } from "@/core/components/add_fab";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { nanoid } from "nanoid";
import { IExerciseItem } from "@/admin_panel/activity_editor/model/activity/activity";
import { IFillOrDragExerciseItemContent } from "@/admin_panel/activity_editor/model/activity/fill_or_drag_activity";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["exercise"]}
      hook={() => viewModel}
      component={FillOrDragActivity}
    />
  );
}

function FillOrDragActivity(viewModel: IViewModel) {
  const { exercise, setExercise } = viewModel;

  return (
    <>
      <List>
        {(exercise as IExerciseItem<IFillOrDragExerciseItemContent>[]).map(
          (item) => {
            const { id, content } = item;
            return (
              <ActivityListItemPaper key={id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      onClick={() => {
                        setExercise((prev) => {
                          const newExercise = [...prev].filter(
                            (x) => x.id !== id
                          );
                          return newExercise;
                        });
                      }}
                    >
                      <Clear color="error" />
                    </IconButton>
                  }
                >
                  <Input
                    fullWidth
                    sx={{ marginRight: "1.5rem" }}
                    value={content.text}
                    onChange={(e) =>
                      setExercise((prev) => {
                        const newExercise = [
                          ...prev,
                        ] as IExerciseItem<IFillOrDragExerciseItemContent>[];
                        newExercise.find((x) => x.id === id)!.content.text =
                          e.target.value;
                        return newExercise;
                      })
                    }
                  />
                </ListItem>
              </ActivityListItemPaper>
            );
          }
        )}
      </List>
      <AddFab
        onClick={() =>
          setExercise((prev) => [
            ...prev,
            { id: nanoid(), content: { text: "" } },
          ])
        }
      />
    </>
  );
}
