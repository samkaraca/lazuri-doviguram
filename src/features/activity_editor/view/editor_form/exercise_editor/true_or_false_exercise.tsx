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
import useViewModelContext from "@/features/activity_editor/view_model";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { TrueFalseQuestion } from "@/core/models/entities/question";
import { nanoid } from "nanoid";

export default function TrueOrFalseActivity() {
  const { trueFalseExercise, setTrueFalseExercise } = useViewModelContext()!;

  return (
    <>
      <List>
        {Array.from(trueFalseExercise, ([key, item]) => {
          const { question } = item;
          return (
            <ActivityListItemPaper key={key}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" position="relative" right="-0.8rem">
                    <RadioGroup
                      row
                      value={item.answer}
                      onChange={(e, value) =>
                        setTrueFalseExercise((prev) => {
                          const newExercise = new Map(prev);
                          newExercise.set(
                            key,
                            new TrueFalseQuestion(
                              prev.get(key)!.question,
                              value === "true"
                            )
                          );
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
                      onClick={() =>
                        setTrueFalseExercise((prev) => {
                          const newExercise = new Map(prev);
                          newExercise.delete(key);
                          return newExercise;
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
                  value={question}
                  onChange={(e) => {
                    setTrueFalseExercise((prev) => {
                      const newExercise = new Map(prev);
                      newExercise.set(
                        key,
                        new TrueFalseQuestion(
                          e.target.value,
                          prev.get(key)!.answer
                        )
                      );
                      return newExercise;
                    });
                  }}
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <Fab
        onClick={() => {
          setTrueFalseExercise((prev) => {
            const newExercise = new Map(prev);
            newExercise.set(nanoid(), new TrueFalseQuestion("", true));
            return newExercise;
          });
        }}
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
