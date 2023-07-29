import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { FillInBlanksQuestion } from "@/core/models/entities/question";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";

export function TypeInBlanksExercise({
  exercise,
  closeActivity,
}: {
  exercise: FillInBlanksExercise;
  closeActivity: VoidFunction;
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState<Map<string, string>[]>([]);

  useEffect(() => {
    // const localData =
    //   userExerciseLocalRepository.current.getLocalUserActivityData({
    //     activityId,
    //   });
    // if (localData && localData.exerciseData) {
    //   setIsFinished(true);
    //   setReplies(
    //     localData.exerciseData.map(
    //       (reply: [string, string][]) => new Map(reply)
    //     )
    //   );
    // }
  }, [exercise]);

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple composite-question-list`}>
          {exercise.questions.map((item, index) => {
            return (
              <li key={index}>
                <section aria-label="soru">
                  {Array.from(
                    item.rawQuestion,
                    ([pieceKey, { type, value }]) => {
                      if (type === "text") {
                        return <p key={pieceKey}>{value}</p>;
                      }

                      return (
                        <input
                          type="text"
                          style={{ width: "10rem" }}
                          // className={`basic ${
                          //   isFinished ? (isCorrect ? "success" : "error") : ""
                          // }`}
                          key={pieceKey}
                          disabled={isFinished}
                          // value={replyMap?.get(pieceKey) ?? ""}
                          onChange={(e) => {
                            setReplies((prev) => {
                              const newReplies = [...prev];
                              const newReplyMap = new Map(
                                newReplies[index] ?? new Map()
                              );
                              newReplyMap.set(pieceKey, e.target.value);
                              newReplies[index] = newReplyMap;
                              return newReplies;
                            });
                          }}
                        />
                      );
                    }
                  )}
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
