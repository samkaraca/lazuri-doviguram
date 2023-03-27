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
import { useViewModelContext } from "@/admin_panel/activity_editor/view_model";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "@/admin_panel/activity_editor/model/view_model";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import {
  ITrueOrFalseExerciseItemContent,
  initialTrueFalse,
} from "@/admin_panel/activity_editor/model/activity/true_or_false_activity";
import { nanoid } from "nanoid";
import { IExerciseItem } from "@/admin_panel/activity_editor/model/activity/activity";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["exercise"]}
      component={TrueOrFalseActivity}
      hook={() => viewModel}
    />
  );
}

function TrueOrFalseActivity(viewModel: IViewModel) {
  const { exercise, setExercise } = viewModel;

  return (
    <>
      <List>
        {exercise.map((item) => {
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
                        setExercise((prev) => {
                          const newExercise = [...prev];
                          const exerciseItem = newExercise.find(
                            (x) => x.id === id
                          ) as IExerciseItem;
                          const newExerciseContent =
                            exerciseItem.content as ITrueOrFalseExerciseItemContent;
                          newExerciseContent.isTrue =
                            value === "true" ? true : false;
                          return newExercise;
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
                  </Stack>
                }
              >
                <Input
                  fullWidth
                  sx={{ marginRight: "13rem" }}
                  value={content.text}
                  onChange={(e) =>
                    setExercise((prev) => {
                      const newExercise = [...prev];
                      newExercise.find((x) => x.id === id)!.content.text =
                        e.target.value;
                      return newExercise;
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
          setExercise((prev) => [
            ...prev,
            { id: nanoid(), content: { text: "", isTrue: initialTrueFalse } },
          ])
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
