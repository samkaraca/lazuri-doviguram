import {
  Fab,
  FormControlLabel,
  IconButton,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Add, Clear } from "@mui/icons-material";
import useViewModelContext from "@/admin_panel/activity_editor/view_model";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "@/admin_panel/activity_editor/model/view_model";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import {
  ITrueOrFalseExerciseItemContent,
  initialTrueOrFalse,
} from "@/admin_panel/activity_editor/model/activity/true_or_false_activity";
import { IExerciseItem } from "@/admin_panel/activity_editor/model/activity/activity";
import { nanoid } from "nanoid";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["trueOrFalseExercise"]}
      component={TrueOrFalseActivity}
      hook={() => viewModel}
    />
  );
}

function TrueOrFalseActivity(viewModel: IViewModel) {
  const { trueOrFalseExercise, dispatchTrueOrFalseExercise } = viewModel;

  return (
    <>
      <List>
        {(
          trueOrFalseExercise as IExerciseItem<ITrueOrFalseExerciseItemContent>[]
        ).map((item) => {
          const { id, content } = item;
          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" position="relative" right="-0.8rem">
                    <RadioGroup
                      row
                      value={content.isTrue}
                      onChange={(e, value) =>
                        dispatchTrueOrFalseExercise({
                          type: "changeIsTrue",
                          isTrue: value === "true" ? true : false,
                          id,
                        })
                      }
                    >
                      <FormControlLabel
                        control={<Radio color="success" />}
                        value="true"
                        label="Doğru"
                      />
                      <FormControlLabel
                        control={<Radio color="error" />}
                        value="false"
                        label="Yanlış"
                      />
                    </RadioGroup>
                    <IconButton
                      onClick={() =>
                        dispatchTrueOrFalseExercise({
                          type: "remove",
                          id,
                        })
                      }
                    >
                      <Clear color="error" />
                    </IconButton>
                  </Stack>
                }
              >
                <Input
                  fullWidth
                  sx={{ marginRight: "13rem" }}
                  value={content.text}
                  onChange={(e) =>
                    dispatchTrueOrFalseExercise({
                      type: "changeText",
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
      <Fab
        onClick={() =>
          dispatchTrueOrFalseExercise({
            type: "add",
            item: {
              id: nanoid(),
              content: {
                text: "",
                isTrue: initialTrueOrFalse === "true" ? true : false,
              },
            },
          })
        }
        color="secondary"
        size="small"
        sx={{
          position: "absolute",
          bottom: "-1.4rem",
          right: "0",
          left: "0",
          margin: "0 auto",
        }}
      >
        <Add />
      </Fab>
    </>
  );
}
