import { MultipleChoiceQuestion } from "@/core/models/entities/question";
import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";

export function MultipleChoiceExercise({
  activityId,
  closeActivity,
  exercise,
}: {
  activityId: string;
  closeActivity: VoidFunction;
  exercise: MultipleChoiceQuestion[];
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState<number[]>([]);

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
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple multiple-choice`}>
          {exercise.map((item, index) => {
            const { question, choices } = item;
            const reply = replies[index];
            const isCorrect =
              reply !== undefined && reply !== null ? item.check(reply) : false;

            return (
              <li
                key={index}
                className={`${
                  isFinished ? (isCorrect ? "success" : "error") : ""
                }`}
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
      <ActivityFooter
        closeActivity={closeActivity}
        finishActivity={finishActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      />
    </article>
  );
}
