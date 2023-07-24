import activityStyles from "../activity.module.scss";
import { useEffect, useRef, useState } from "react";
import { FillInBlanksQuestion } from "@/core/models/entities/question";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";

export function TypeInBlanksExercise({
  exercise,
  activityId,
  closeActivity,
}: {
  exercise: FillInBlanksQuestion[];
  activityId: string;
  closeActivity: VoidFunction;
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [replies, setReplies] = useState<Map<string, string>[]>([]);

  const gradeActivity = () => {
    let correct = 0;
    let total = 0;
    exercise.forEach((item, i) => {
      Array.from(item.answer).forEach(([key, answer]) => {
        const reply = replies[i]?.get(key);
        if (reply && item.check(key, reply)) correct++;
        total++;
      });
    });
    return (correct / total) * 100;
  };

  const finishActivity = () => {
    setIsFinished(true);
    userExerciseLocalRepository.current.saveUserActivityDataLocally({
      activityId,
      grade: gradeActivity(),
      exerciseData: replies.map((replyMap) =>
        replyMap ? Array.from(replyMap) : undefined
      ),
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
      setReplies(
        localData.exerciseData.map(
          (reply: [string, string][]) => new Map(reply)
        )
      );
    }
  }, [exercise]);

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple composite-question-list`}>
          {exercise.map((item, index) => {
            return (
              <li key={index}>
                <section aria-label="soru">
                  {Array.from(item.parsed, ([pieceKey, pieceValue], i) => {
                    if (i % 2 === 0) {
                      return <p key={pieceKey}>{pieceValue}</p>;
                    }

                    const replyMap = replies[index] as
                      | Map<string, string>
                      | undefined;
                    const reply = replyMap?.get(pieceKey);
                    const isCorrect =
                      reply !== undefined && reply !== null
                        ? item.check(pieceKey, reply)
                        : false;

                    return (
                      <input
                        type="text"
                        style={{ width: "10rem" }}
                        className={`basic ${
                          isFinished ? (isCorrect ? "success" : "error") : ""
                        }`}
                        key={pieceKey}
                        disabled={isFinished}
                        value={replyMap?.get(pieceKey) ?? ""}
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
