import useViewModelContext from "@/features/activity_editor/view_model";
import { Add, Clear } from "@mui/icons-material";
import { Fab, IconButton, Radio } from "@mui/material";
import styles from "./styles.module.scss";
import { nanoid } from "nanoid";
import * as AdminMCEServices from "@/lib/exercise/multiple_choice_exercise/admin_mce_services";
import IMultipleChoiceExercise from "@/lib/exercise/multiple_choice_exercise/multiple_choice_exercise";

export function MultipleChoiceExerciseForm() {
  const viewModel = useViewModelContext()!;
  const { setExercise } = viewModel;
  const exercise = viewModel.exercise as IMultipleChoiceExercise;

  return (
    <div className={styles["container"]}>
      <ol aria-label="multiple choice questions">
        {exercise.template.map(({ id, choices, questionText }) => {
          return (
            <li key={id}>
              <div className={styles["question-bar"]}>
                <textarea
                  aria-label="question text"
                  placeholder="soru..."
                  value={questionText}
                  onChange={(e) =>
                    setExercise((prev) =>
                      AdminMCEServices.changeQuestionText(
                        id,
                        e.target.value,
                        prev as any
                      )
                    )
                  }
                />
                <IconButton
                  color="error"
                  onClick={() =>
                    setExercise((prev) =>
                      AdminMCEServices.removeQuestion(id, prev as any)
                    )
                  }
                >
                  <Clear />
                </IconButton>
              </div>
              <ul aria-label="choices">
                {choices.map((choice, i) => {
                  const answer = exercise.answers.find((a) => a.id === id);

                  return (
                    <li key={i}>
                      <Radio
                        checked={answer?.value === i.toString()}
                        onClick={() => {
                          setExercise((prev) =>
                            AdminMCEServices.changeAnswer(
                              id,
                              i.toString() as "0" | "1" | "2" | "3",
                              prev as any
                            )
                          );
                        }}
                      />
                      <textarea
                        placeholder={`cevap ${i + 1}`}
                        value={choice}
                        onChange={(e) =>
                          setExercise((prev) =>
                            AdminMCEServices.changeChoiceText(
                              id,
                              i as any,
                              e.target.value,
                              prev as any
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
        })}
      </ol>
      <Fab
        onClick={() => {
          setExercise((prev) =>
            AdminMCEServices.addNewQuestion(nanoid(), prev as any)
          );
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
