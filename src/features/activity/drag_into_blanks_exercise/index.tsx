import { DndSetting } from "@/core/models/entities/dnd_setting";
import { useEffect, useRef, useState } from "react";
import { WrapperDndContext } from "@/core/components/dnd/wrapper_dnd_context";
import { Droppable } from "@/core/components/dnd/droppable";
import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { Draggable } from "@/core/components/dnd/draggable";
import { FillInBlanksQuestion } from "@/core/models/entities/question";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";

export function DragIntoBlanksExercise({
  exercise,
  activityId,
  closeActivity,
}: {
  exercise: FillInBlanksQuestion[];
  activityId: string;
  closeActivity: VoidFunction;
}) {
  const [isFinished, setIsFinished] = useState(false);
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [dndSetting, setDndSetting] = useState<DndSetting>(
    new DndSetting(activityId, userExerciseLocalRepository.current, new Map())
  );

  const finishActivity = () => {
    setIsFinished(true);
    dndSetting.saveUserDataLocally();
  };

  const reattemptToActivity = () => {
    setDndSetting(dndSetting.reset());
    setIsFinished(false);
  };

  useEffect(() => {
    let answersWithKeys = new Map();

    exercise.forEach((item, key) => {
      const answers = item.answer;
      answersWithKeys = new Map([
        ...Array.from(answersWithKeys),
        ...Array.from(answers),
      ]);
    });

    const finalExerciseData = DndSetting.withUserDataFrom(
      activityId,
      userExerciseLocalRepository.current,
      answersWithKeys
    );

    setDndSetting(finalExerciseData.dndSetting);
    setIsFinished(finalExerciseData.userData);
  }, [exercise]);

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <WrapperDndContext
          disabled={isFinished}
          dndSetting={dndSetting}
          setDndSetting={setDndSetting}
        >
          <section aria-label="sorular">
            <ol className={`simple composite-question-list`}>
              {exercise.map((item, index) => {
                return (
                  <li key={index}>
                    <section aria-label="soru içeriği">
                      {Array.from(
                        item.parsed,
                        ([pieceKey, pieceValue], index) => {
                          if (index % 2 === 0) {
                            return <p key={pieceKey}>{pieceValue}</p>;
                          } else {
                            const blankKey = pieceKey;
                            const boardItemEntry =
                              dndSetting.getBoardItemContainingTheLocation(
                                blankKey
                              );
                            const isCorrect = dndSetting.check(blankKey);

                            return (
                              <Droppable
                                status={
                                  isFinished
                                    ? isCorrect
                                      ? "success"
                                      : "error"
                                    : "neutral"
                                }
                                disabled={isFinished}
                                key={pieceKey}
                                blankKey={blankKey}
                              >
                                {boardItemEntry && (
                                  <Draggable
                                    status={
                                      isFinished
                                        ? isCorrect
                                          ? "success"
                                          : "error"
                                        : "neutral"
                                    }
                                    disabled={isFinished}
                                    boardItemEntry={boardItemEntry}
                                  />
                                )}
                              </Droppable>
                            );
                          }
                        }
                      )}
                    </section>
                  </li>
                );
              })}
            </ol>
          </section>
        </WrapperDndContext>
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
