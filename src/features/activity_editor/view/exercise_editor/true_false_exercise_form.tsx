import {
  Fab,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Add, Clear } from "@mui/icons-material";
import useViewModelContext from "@/features/activity_editor/view_model";
import { ActivityListItemPaper } from "@/components/list_item_paper";
import { nanoid } from "nanoid";
import * as AdminBEServices from "@/lib/exercise/qa_exercise/admin_qae_services";
import IQAExercise from "@/lib/exercise/qa_exercise/qa_exercise";

export default function TrueFalseExerciseForm() {
  const viewModel = useViewModelContext()!;
  const { setExercise } = viewModel;
  const exercise = viewModel.exercise as IQAExercise;

  return (
    <>
      <List>
        {exercise.template.map(({ id, questionText }) => {
          const answer = exercise.answers.find((a) => a.id === id);

          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" position="relative" right="-0.8rem">
                    <RadioGroup
                      row
                      value={answer?.value === "true"}
                      onChange={(e, value) => {
                        setExercise((prev) =>
                          AdminBEServices.changeAnswer(id, value, prev as any)
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
                        setExercise((prev) =>
                          AdminBEServices.removeQuestion(id, prev as any)
                        );
                      }}
                    >
                      <Clear color="error" />
                    </IconButton>
                  </Stack>
                }
              >
                <TextField
                  multiline
                  fullWidth
                  sx={{ marginRight: "13rem" }}
                  value={questionText}
                  onChange={(e) => {
                    setExercise((prev) =>
                      AdminBEServices.changeQuestionText(
                        id,
                        e.target.value,
                        prev as any
                      )
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
          setExercise((prev) =>
            AdminBEServices.addNewQuestion(nanoid(), "", "false", prev as any)
          )
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
