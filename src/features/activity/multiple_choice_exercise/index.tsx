import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { ActivityFooter } from "../layout/activity_footer";
import { MultipleChoiceExercise as IMultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";

export function MultipleChoiceExercise({
  localData,
  saveLocalData,
  closeActivity,
  exercise,
}: {
  localData?: any;
  saveLocalData?: (data: any, grade: number) => void;
  closeActivity: VoidFunction;
  exercise: IMultipleChoiceExercise;
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

  const handleReply = (id: string, reply: 0 | 1 | 2 | 3) => {
    setReplies((prev) => {
      return prev.map((r) => {
        if (r.id !== id) return r;
        return { ...r, value: reply };
      });
    });
  };

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple multiple-choice`}>
          {exercise.questions.map(
            ({ id, question, choices, answer }, index) => {
              const reply = replies.find((r) => r.id === id);
              const isCorrect = reply && reply.value === answer;

              return (
                <li
                  key={id}
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
                              onChange={() => handleReply(id, i as any)}
                              checked={reply && reply.value === i}
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
            }
          )}
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
