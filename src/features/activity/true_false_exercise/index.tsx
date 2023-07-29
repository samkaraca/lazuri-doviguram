import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { TrueFalseQuestion } from "@/core/models/entities/question";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";

export function TrueFalseExercise({
  exercise,
  closeActivity,
}: {
  exercise: SimpleExercise;
  closeActivity: VoidFunction;
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState<boolean[]>([]);

  useEffect(() => {}, [exercise]);

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
          {exercise.questions.map(({ id, question, reply }, i) => {
            return (
              <li
                className={`${
                  isFinished ? styles[isCorrect ? "success" : "error"] : ""
                }`}
                key={id}
              >
                <section aria-label="soru">
                  <p className={styles["question"]}>{question}</p>
                  <div className={styles["radio-buttons"]}>
                    <div className={styles["radio-button"]}>
                      <input
                        type="radio"
                        name={`true-false-${id}`}
                        disabled={isFinished}
                        checked={reply === "true"}
                        onChange={() => {
                          setReplies((prev) => {
                            const newReplies = [...prev];
                            newReplies[i] = true;
                            return newReplies;
                          });
                        }}
                      />
                    </div>
                    <div className={styles["radio-button"]}>
                      <input
                        type="radio"
                        name={`true-false-${id}`}
                        disabled={isFinished}
                        checked={reply === "false"}
                        onChange={() => {
                          setReplies((prev) => {
                            const newReplies = [...prev];
                            newReplies[i] = false;
                            return newReplies;
                          });
                        }}
                      />
                    </div>
                  </div>
                </section>
              </li>
            );
          })}
        </ol>
      </div>
      {/* <ActivityFooter
        finishActivity={finishActivity}
        closeActivity={closeActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      /> */}
    </section>
  );
}
