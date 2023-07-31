import useViewModelContext from "@/features/activity_editor/view_model";
import { Add, Clear } from "@mui/icons-material";
import { Fab, IconButton, Radio } from "@mui/material";
import styles from "./styles.module.scss";
import { nanoid } from "nanoid";
import {
  addNewQuestion,
  changeAnswer,
  changeChoiceText,
  changeQuestionText,
  removeQuestion,
} from "@/lib/exercises/mce_service";

export function MultipleChoiceExerciseForm() {
  const { multipleChoiceExercise, setMultipleChoiceExercise } =
    useViewModelContext()!;

  return (
    <div className={styles["container"]}>
      <ol aria-label="multiple choice questions">
        {multipleChoiceExercise.questions.map(
          ({ id, answer, choices, question }) => {
            return (
              <li key={id}>
                <div className={styles["question-bar"]}>
                  <textarea
                    aria-label="question text"
                    placeholder="soru..."
                    value={question}
                    onChange={(e) =>
                      setMultipleChoiceExercise((prev) =>
                        changeQuestionText(id, e.target.value, prev)
                      )
                    }
                  />
                  <IconButton
                    color="error"
                    onClick={() =>
                      setMultipleChoiceExercise((prev) =>
                        removeQuestion(id, prev)
                      )
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
                            setMultipleChoiceExercise((prev) =>
                              changeAnswer(id, i as any, prev)
                            )
                          }
                        />
                        <textarea
                          placeholder={`cevap ${i + 1}`}
                          value={choice}
                          onChange={(e) =>
                            setMultipleChoiceExercise((prev) =>
                              changeChoiceText(
                                id,
                                i as any,
                                e.target.value,
                                prev
                              )
                            )
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
          setMultipleChoiceExercise((prev) => addNewQuestion(nanoid(), prev));
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
