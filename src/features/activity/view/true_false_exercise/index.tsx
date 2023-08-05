import styles from "./styles.module.scss";
import activityStyles from "../../activity.module.scss";
import useViewModelContext from "../../view_model";
import * as ExerciseServices from "@/lib/exercise/exercise_services";
import IQAExercise from "@/lib/exercise/qa_exercise/qa_exercise";

export function TrueFalseExercise() {
  const { activityData, replies, isSolved, setReplies } =
    useViewModelContext()!;

  if (!replies) return null;

  return (
    <section
      className={styles["container"]}
      aria-label="doğru yanlış egzersizi"
    >
      <div className={activityStyles["exercise-body"]}>
        <header>
          <span>Doğru</span>
          <span>Yanlış</span>
        </header>
        <ol className={`simple ${styles["questions"]}`}>
          {(activityData.exercise as IQAExercise).template.map(
            ({ id, questionText }) => {
              const reply = ExerciseServices.getReply(id, replies);
              const isCorrect = ExerciseServices.checkReply(
                id,
                activityData.exercise,
                replies
              );

              return (
                <li
                  className={`${
                    isSolved ? styles[isCorrect ? "success" : "error"] : ""
                  }`}
                  key={id}
                >
                  <section aria-label="soru">
                    <p className={styles["question"]}>{questionText}</p>
                    <div className={styles["radio-buttons"]}>
                      <div className={styles["radio-button"]}>
                        <input
                          type="radio"
                          name={`true-false-${id}`}
                          disabled={isSolved}
                          checked={reply && reply.value === "true"}
                          onChange={() =>
                            setReplies(
                              ExerciseServices.reply(id, "true", replies)
                            )
                          }
                        />
                      </div>
                      <div className={styles["radio-button"]}>
                        <input
                          type="radio"
                          name={`true-false-${id}`}
                          disabled={isSolved}
                          checked={reply && reply.value === "false"}
                          onChange={() =>
                            setReplies(
                              ExerciseServices.reply(id, "false", replies)
                            )
                          }
                        />
                      </div>
                    </div>
                  </section>
                </li>
              );
            }
          )}
        </ol>
      </div>
    </section>
  );
}
