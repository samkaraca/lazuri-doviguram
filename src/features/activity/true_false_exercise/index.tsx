import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { TrueFalseQuestion } from "@/core/models/entities/question";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";

export function TrueFalseExercise({
  exercise,
  activityId,
  closeActivity,
}: {
  exercise: TrueFalseQuestion[];
  activityId: string;
  closeActivity: VoidFunction;
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState<boolean[]>([]);

  const gradeActivity = () => {
    let correct = 0;
    exercise.forEach((item, i) => {
      if (exercise[i].check(replies[i])) {
        correct++;
      }
    });
    return (correct / exercise.length) * 100;
  };

  const finishActivity = () => {
    setIsFinished(true);
    userExerciseLocalRepository.current.saveUserActivityDataLocally({
      activityId,
      grade: gradeActivity(),
      exerciseData: replies,
    });
  };

  const reattemptToActivity = () => {
    const localData =
      userExerciseLocalRepository.current.getLocalUserActivityData({
        activityId,
      });
    if (localData) {
      userExerciseLocalRepository.current.saveUserActivityDataLocally({
        activityId,
        grade: parseInt(localData.grade),
        exerciseData: null,
      });
    }
    setReplies([]);
    setIsFinished(false);
  };

  useEffect(() => {
    const localData =
      userExerciseLocalRepository.current.getLocalUserActivityData({
        activityId,
      });
    if (localData && localData.exerciseData) {
      setIsFinished(true);
      setReplies(localData.exerciseData);
    }
  }, [exercise]);

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
          {exercise.map((item, i) => {
            const { question } = item;
            const reply = replies[i];
            const isCorrect =
              reply !== undefined && reply !== null ? item.check(reply) : false;

            return (
              <li
                className={`${
                  isFinished ? styles[isCorrect ? "success" : "error"] : ""
                }`}
                key={i}
              >
                <section aria-label="soru">
                  <p className={styles["question"]}>{question}</p>
                  <div className={styles["radio-buttons"]}>
                    <div className={styles["radio-button"]}>
                      <input
                        type="radio"
                        name={`true-false-${i}`}
                        disabled={isFinished}
                        checked={reply === true}
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
                        name={`true-false-${i}`}
                        disabled={isFinished}
                        checked={reply === false}
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
      <ActivityFooter
        finishActivity={finishActivity}
        closeActivity={closeActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      />
    </section>
  );
}
