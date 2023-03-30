import { Clear } from "@mui/icons-material";
import { IconButton, Input, List, ListItem } from "@mui/material";
import SelectiveConsumer from "@/core/components/selective_consumer";
import useViewModelContext from "@/admin_panel/activity_editor/view_model";
import { IViewModel } from "@/admin_panel/activity_editor/model/view_model";
import { AddFab } from "@/core/components/add_fab";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { IExerciseItem } from "@/admin_panel/activity_editor/model/activity/activity";
import { ITypeOrDragExerciseItemContent } from "@/admin_panel/activity_editor/model/activity/type_or_drag_activity";
import { nanoid } from "nanoid";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["typeOrDragExercise"]}
      hook={() => viewModel}
      component={FillOrDragActivity}
    />
  );
}

function FillOrDragActivity(viewModel: IViewModel) {
  const { typeOrDragExercise, dispatchTypeOrDragExercise } = viewModel;

  return (
    <>
      <List>
        {(
          typeOrDragExercise as IExerciseItem<ITypeOrDragExerciseItemContent>[]
        ).map((item) => {
          const { id, content } = item;
          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() =>
                      dispatchTypeOrDragExercise({
                        type: "remove",
                        id,
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
                  value={content.rawContent}
                  onChange={(e) =>
                    dispatchTypeOrDragExercise({
                      type: "change",
                      id,
                      text: e.target.value,
                    })
                  }
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <AddFab
        onClick={() =>
          dispatchTypeOrDragExercise({
            type: "add",
            item: {
              id: nanoid(),
              content: { processedContent: [], rawContent: "" },
            },
          })
        }
      />
    </>
  );
}
