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
import {
  SimpleExercise,
  SimpleQuestion,
} from "@/lib/exercises/simple_question_exercise";

export default function TrueFalseExerciseForm() {
  const { simpleExercise, setSimpleExercise } = useViewModelContext()!;

  return (
    <>
      <List>
        {simpleExercise.questions.map(({ id, answer, reply, question }) => {
          return (
            <ActivityListItemPaper key={id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" position="relative" right="-0.8rem">
                    <RadioGroup
                      row
                      value={answer === "true"}
                      onChange={(e, value) =>
                        setSimpleExercise((prev) => {
                          const newQuestions = prev.questions.map((q) => {
                            if (q.id !== id) return SimpleQuestion.from(q);
                            return SimpleQuestion.from({
                              id: q.id,
                              question: q.question,
                              reply: q.reply,
                              answer: value,
                            });
                          });
                          return new SimpleExercise(
                            prev.activityId,
                            newQuestions
                          );
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
                        setSimpleExercise((prev) => {
                          const newQuestions = prev.questions.filter(
                            (q) => q.id !== id
                          );
                          return new SimpleExercise(
                            prev.activityId,
                            newQuestions
                          );
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
                    setSimpleExercise((prev) => {
                      const newQuestions = prev.questions.map((q) => {
                        if (q.id !== id) return SimpleQuestion.from(q);
                        return new SimpleQuestion(
                          q.id,
                          e.target.value,
                          q.answer,
                          q.reply
                        );
                      });
                      return new SimpleExercise(prev.activityId, newQuestions);
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
          setSimpleExercise((prev) => {
            const newQuestions = [
              ...prev.questions,
              new SimpleQuestion(nanoid(), "", "false", null),
            ];
            return new SimpleExercise(prev.activityId, newQuestions);
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
