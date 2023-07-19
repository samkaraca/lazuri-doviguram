import { MultipleChoiceQuestion } from "@/core/models/entities/question";
import useViewModelContext from "@/features/activity_editor/view_model";
import { Add, Clear } from "@mui/icons-material";
import { Fab, IconButton, Radio } from "@mui/material";
import styles from "./styles.module.scss";
import { nanoid } from "nanoid";

export function MultipleChoiceExerciseForm() {
  const { multipleChoiceExercise, setMultipleChoiceExercise } =
    useViewModelContext()!;

  return (
    <div className={styles["container"]}>
      <ol aria-label="multiple choice questions">
        {Array.from(multipleChoiceExercise, ([key, item]) => {
          return (
            <li key={key}>
              <div className={styles["question-bar"]}>
                <textarea
                  aria-label="question text"
                  placeholder="soru..."
                  onChange={(e) =>
                    setMultipleChoiceExercise((prev) => {
                      const newExercise = new Map(prev);
                      newExercise.set(
                        key,
                        new MultipleChoiceQuestion(
                          e.target.value,
                          prev.get(key)!.choices,
                          prev.get(key)!.answer
                        )
                      );
                      return newExercise;
                    })
                  }
                />
                <IconButton
                  color="error"
                  onClick={() =>
                    setMultipleChoiceExercise((prev) => {
                      const newExercise = new Map(prev);
                      newExercise.delete(key);
                      return newExercise;
                    })
                  }
                >
                  <Clear />
                </IconButton>
              </div>
              <ul aria-label="choices">
                {item.choices.map((e, i) => {
                  return (
                    <li key={i}>
                      <Radio
                        checked={item.answer === i}
                        onClick={() =>
                          setMultipleChoiceExercise((prev) => {
                            const newExercise = new Map(prev);
                            newExercise.set(
                              key,
                              new MultipleChoiceQuestion(
                                prev.get(key)!.question,
                                prev.get(key)!.choices,
                                i
                              )
                            );
                            return newExercise;
                          })
                        }
                      />
                      <textarea
                        placeholder={`cevap ${i + 1}`}
                        onChange={(e) =>
                          setMultipleChoiceExercise((prev) => {
                            const newExercise = new Map(prev);
                            const newChoices = prev.get(key)!.choices;
                            newChoices[i] = e.target.value;
                            newExercise.set(
                              key,
                              new MultipleChoiceQuestion(
                                prev.get(key)!.question,
                                newChoices,
                                prev.get(key)!.answer
                              )
                            );
                            return newExercise;
                          })
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
      <Fab
        onClick={() => {
          setMultipleChoiceExercise((prev) => {
            const newExercise = new Map(prev);
            newExercise.set(
              nanoid(),
              new MultipleChoiceQuestion("", ["", "", "", ""], 0)
            );
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
    </div>
  );
}
