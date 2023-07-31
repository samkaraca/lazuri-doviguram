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
import { nanoid } from "nanoid";
import {
  addNewQuestion,
  changeAnswer,
  changeQuestionText,
  removeQuestion,
} from "@/lib/exercises/se_service";

export default function TrueFalseExerciseForm() {
  const { simpleExercise, setSimpleExercise } = useViewModelContext()!;

  return (
    <>
      <List>
        {simpleExercise.questions.map(({ id, answer, question }) => {
          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" position="relative" right="-0.8rem">
                    <RadioGroup
                      row
                      value={answer === "true"}
                      onChange={(e, value) => {
                        setSimpleExercise((prev) =>
                          changeAnswer(id, value, prev)
                        );
                      }}
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
                        setSimpleExercise((prev) => removeQuestion(id, prev));
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
                  value={question}
                  onChange={(e) => {
                    setSimpleExercise((prev) =>
                      changeQuestionText(id, e.target.value, prev)
                    );
                  }}
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <Fab
        onClick={() =>
          setSimpleExercise((prev) => addNewQuestion(nanoid(), "false", prev))
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
