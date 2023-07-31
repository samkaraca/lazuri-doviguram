import activityStyles from "../activity.module.scss";
import { useEffect, useState } from "react";
import { ActivityFooter } from "../layout/activity_footer";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";

export function TypeInBlanksExercise({
  localData,
  saveLocalData,
  closeActivity,
  exercise,
}: {
  localData?: any;
  saveLocalData?: (data: any, grade: number) => void;
  closeActivity: VoidFunction;
  exercise: FillInBlanksExercise;
}) {
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState(exercise.repliesTemplate);

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

  const handleReply = (id: string, reply: string) => {
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
        <ol className={`simple composite-question-list`}>
          {exercise.questions.map((item, index) => {
            return (
              <li key={index}>
                <section aria-label="soru">
                  {item.rawQuestion.map(({ id, type, value }) => {
                    if (type === "text") {
                      return <p key={id}>{value}</p>;
                    }

                    const reply = replies.find((r) => r.id === id);
                    const isCorrect = reply?.value === value;

                    return (
                      <input
                        type="text"
                        style={{ width: "10rem" }}
                        className={`basic ${
                          isFinished ? (isCorrect ? "success" : "error") : ""
                        }`}
                        key={id}
                        disabled={isFinished}
                        value={reply?.value ?? ""}
                        onChange={(e) => handleReply(id, e.target.value)}
                      />
                    );
                  })}
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
