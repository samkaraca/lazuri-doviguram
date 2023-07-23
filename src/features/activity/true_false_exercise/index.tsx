import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TrueFalseQuestion } from "@/core/models/entities/question";

export function TrueFalseExercise({
  exercise,
  isFormLocked,
  resetSwitch,
}: {
  isFormLocked: boolean;
  exercise: TrueFalseQuestion[];
  resetSwitch: boolean;
}) {
  const [replies, setReplies] = useState<boolean[]>([]);

  useEffect(() => {
    setReplies([]);
  }, [resetSwitch]);

  return (
    <section
      className={styles["container"]}
      aria-label="doğru yanlış egzersizi"
    >
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
                isFormLocked ? styles[isCorrect ? "success" : "error"] : ""
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
                      disabled={isFormLocked}
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
                      disabled={isFormLocked}
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
    </section>
  );
}
