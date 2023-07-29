import useViewModelContext from "@/features/activity_editor/view_model";
import { Add, Clear } from "@mui/icons-material";
import { Fab, IconButton, Radio } from "@mui/material";
import styles from "./styles.module.scss";
import { nanoid } from "nanoid";
import {
  MultipleChoiceExercise,
  MultipleChoiceQuestion,
} from "@/lib/exercises/multiple_choice_exercise";

export function MultipleChoiceExerciseForm() {
  const { multipleChoiceExercise, setMultipleChoiceExercise } =
    useViewModelContext()!;

  return (
    <div className={styles["container"]}>
      <ol aria-label="multiple choice questions">
        {multipleChoiceExercise.questions.map(
          ({ id, answer, choices, question, reply }) => {
            return (
              <li key={id}>
                <div className={styles["question-bar"]}>
                  <textarea
                    aria-label="question text"
                    placeholder="soru..."
                    onChange={(e) =>
                      setMultipleChoiceExercise((prev) => {
                        const newQuestions = prev.questions.map((q) => {
                          if (q.id !== id)
                            return MultipleChoiceQuestion.from(q);
                          return new MultipleChoiceQuestion(
                            q.id,
                            e.target.value,
                            q.choices,
                            q.answer,
                            q.reply
                          );
                        });
                        return new MultipleChoiceExercise(
                          prev.activityId,
                          newQuestions
                        );
                      })
                    }
                  />
                  <IconButton
                    color="error"
                    onClick={() =>
                      setMultipleChoiceExercise((prev) => {
                        const newQuestions = prev.questions.filter(
                          (q) => q.id !== id
                        );
                        return new MultipleChoiceExercise(
                          prev.activityId,
                          newQuestions
                        );
                      })
                    }
                  >
                    <Clear />
                  </IconButton>
                </div>
                <ul aria-label="choices">
                  {choices.map((choice, i) => {
                    return (
                      <li key={i}>
                        <Radio
                          checked={answer === i}
                          onClick={() =>
                            setMultipleChoiceExercise((prev) => {
                              const newQuestions = prev.questions.map((q) => {
                                if (q.id !== id)
                                  return MultipleChoiceQuestion.from(q);
                                return new MultipleChoiceQuestion(
                                  q.id,
                                  q.question,
                                  q.choices,
                                  i as 0 | 1 | 2 | 3,
                                  null
                                );
                              });
                              return new MultipleChoiceExercise(
                                prev.activityId,
                                newQuestions
                              );
                            })
                          }
                        />
                        <textarea
                          placeholder={`cevap ${i + 1}`}
                          onChange={(e) =>
                            setMultipleChoiceExercise((prev) => {
                              const newQuestions = prev.questions.map((q) => {
                                if (q.id !== id)
                                  return MultipleChoiceQuestion.from(q);
                                return new MultipleChoiceQuestion(
                                  q.id,
                                  e.target.value,
                                  q.choices,
                                  q.answer,
                                  q.reply
                                );
                              });
                              return new MultipleChoiceExercise(
                                prev.activityId,
                                newQuestions
                              );
                            })
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
        )}
      </ol>
      <Fab
        onClick={() => {
          setMultipleChoiceExercise((prev) => {
            const newQuestions = [
              ...prev.questions,
              new MultipleChoiceQuestion(
                nanoid(),
                "",
                ["", "", "", ""],
                0,
                null
              ),
            ];
            return new MultipleChoiceExercise(prev.activityId, newQuestions);
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
    </div>
  );
}
