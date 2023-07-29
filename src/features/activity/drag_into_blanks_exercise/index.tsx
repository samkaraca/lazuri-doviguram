import { DndSetting } from "@/core/models/entities/dnd_setting";
import { useEffect, useRef, useState } from "react";
import { WrapperDndContext } from "@/core/components/dnd/wrapper_dnd_context";
import { Droppable } from "@/core/components/dnd/droppable";
import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { Draggable } from "@/core/components/dnd/draggable";
import { ActivityFooter } from "../layout/activity_footer";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";
import { useDndSetting } from "@/lib/utils/dnd_setting/use_dnd_setting";
import { Item } from "@/lib/utils/dnd_setting/item";
import { nanoid } from "nanoid";
import { Blank } from "@/lib/utils/dnd_setting/blank";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";

export function DragIntoBlanksExercise({
  exercise,
  activityId,
  closeActivity,
}: {
  exercise: FillInBlanksExercise;
  activityId: string;
  closeActivity: VoidFunction;
}) {
  // const { blanks, board, startDragging, stopDragging } = useDndSetting({
  //   boardData: Array.from(
  //     exercise.answers,
  //     ([key, { type, value }]) => new Item(key, value)
  //   ),
  //   blanksData: Array.from(
  //     exercise.answers,
  //     ([key, { type, value }]) => new Blank(key, value, null)
  //   ),
  // });
  // const [isFinished, setIsFinished] = useState(false);
  // const userExerciseLocalRepository = useRef(
  //   new UserExerciseLocalRepositoryImplementation()
  // );
  // const [dndSetting, setDndSetting] = useState<DndSetting>(
  //   new DndSetting(activityId, userExerciseLocalRepository.current, new Map())
  // );

  // const finishActivity = () => {
  //   setIsFinished(true);
  //   dndSetting.saveUserDataLocally();
  // };

  // const reattemptToActivity = () => {
  //   setDndSetting(dndSetting.reset());
  //   setIsFinished(false);
  // };

  // useEffect(() => {
  //   let answersWithKeys = new Map();

  //   exercise.forEach((item, key) => {
  //     const answers = item.answer;
  //     answersWithKeys = new Map([
  //       ...Array.from(answersWithKeys),
  //       ...Array.from(answers),
  //     ]);
  //   });

  //   const finalExerciseData = DndSetting.withUserDataFrom(
  //     activityId,
  //     userExerciseLocalRepository.current,
  //     answersWithKeys
  //   );

  //   setDndSetting(finalExerciseData.dndSetting);
  //   setIsFinished(finalExerciseData.userData);
  // }, [exercise]);

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <WrapperDndContext
          disabled={isFinished}
          blanks={blanks}
          board={board}
          startDragging={startDragging}
          stopDragging={stopDragging}
        >
          <section aria-label="sorular">
            <ol className={`simple composite-question-list`}>
              {exercise.questions.map((item, index) => {
                return (
                  <li key={index}>
                    <section aria-label="soru içeriği">
                      {Array.from(
                        item.rawQuestion,
                        ([pieceKey, { type, value }], index) => {
                          if (type === "text") {
                            return <p key={pieceKey}>{value}</p>;
                          } else if (type === "blank") {
                            return (
                              <Droppable
                                status={"neutral"}
                                // status={
                                //   isFinished
                                //     ? isCorrect
                                //       ? "success"
                                //       : "error"
                                //     : "neutral"
                                // }
                                disabled={isFinished}
                                key={pieceKey}
                                blankId={pieceKey}
                              >
                                {blanks.find((blank) => blank.id === pieceKey)
                                  ?.item && (
                                  <Draggable
                                    status={"neutral"}
                                    // status={
                                    //   isFinished
                                    //     ? isCorrect
                                    //       ? "success"
                                    //       : "error"
                                    //     : "neutral"
                                    // }
                                    disabled={isFinished}
                                    item={
                                      blanks.find(
                                        (blank) => blank.id === pieceKey
                                      )!.item!
                                    }
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
      {/* <ActivityFooter
        closeActivity={closeActivity}
        finishActivity={finishActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      /> */}
    </article>
  );
}
