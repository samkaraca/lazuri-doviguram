import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";
import { MultipleChoiceExercise as IMultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";

export function MultipleChoiceExercise({
  closeActivity,
  exercise,
}: {
  closeActivity: VoidFunction;
  exercise: IMultipleChoiceExercise;
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState<number[]>([]);

  useEffect(() => {}, [exercise]);

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple multiple-choice`}>
          {exercise.questions.map(({ id, question, choices }, index) => {
            return (
              <li
                key={id}
                // className={`${
                //   isFinished ? (isCorrect ? "success" : "error") : ""
                // }`}
              >
                <section aria-label="soru">
                  <p>{question}</p>
                  <div className={"choices"}>
                    {choices.map((choice, i) => {
                      return (
                        <div key={`${choice}-${i}`} className={"choice"}>
                          <input
                            disabled={isFinished}
                            onChange={() =>
                              setReplies((prev) => {
                                const newReplies = [...prev];
                                newReplies[index] = i;
                                return newReplies;
                              })
                            }
                            checked={replies[index] === i}
                            type="radio"
                            id={`choice-${index}-${i}`}
                            name={`choice-${index}`}
                          />
                          <label htmlFor={`choice-${index}-${i}`}>
                            {choice}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </li>
            );
          })}
        </ol>
      </div>
      {/* <ActivityFooter
        closeActivity={closeActivity}
        finishActivity={finishActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      /> */}
    </article>
  );
}
