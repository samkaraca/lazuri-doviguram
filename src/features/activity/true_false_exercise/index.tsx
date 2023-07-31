import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useState } from "react";
import { ActivityFooter } from "../layout/activity_footer";
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";

export function TrueFalseExercise({
  localData,
  saveLocalData,
  exercise,
  closeActivity,
}: {
  localData?: any;
  saveLocalData?: (data: any, grade: number) => void;
  closeActivity: VoidFunction;
  exercise: SimpleExercise;
}) {
  const [replies, setReplies] = useState(exercise.repliesTemplate);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setReplies(exercise.repliesTemplate);
    setIsFinished(false);
    if (localData) {
      setReplies(localData);
      setIsFinished(true);
      return;
    }
  }, [exercise, localData]);

  const finishActivity = () => {
    if (saveLocalData) {
      saveLocalData(replies, exercise.grade(replies));
    }
    setIsFinished(true);
  };

  const reattemptToActivity = () => {
    if (saveLocalData) {
      saveLocalData(null, exercise.grade(replies));
    }
    setReplies(exercise.repliesTemplate);
    setIsFinished(false);
  };

  const handleReply = (id: string, reply: "true" | "false") => {
    setReplies((prev) => {
      return prev.map((r) => {
        if (r.id !== id) return r;
        return { ...r, value: reply };
      });
    });
  };

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
          {exercise.questions.map(({ id, question, answer }) => {
            const reply = replies.find((r) => r.id === id);
            const isCorrect = reply && reply.value === answer;

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
                        checked={reply && reply.value === "true"}
                        onChange={() => handleReply(id, "true")}
                      />
                    </div>
                    <div className={styles["radio-button"]}>
                      <input
                        type="radio"
                        name={`true-false-${id}`}
                        disabled={isFinished}
                        checked={reply && reply.value === "false"}
                        onChange={() => handleReply(id, "false")}
                      />
                    </div>
                  </div>
                </section>
              </li>
            );
          })}
        </ol>
      </div>
      <ActivityFooter
        finishActivity={finishActivity}
        closeActivity={closeActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      />
    </section>
  );
}
