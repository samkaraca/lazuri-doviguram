import { useEffect, useState } from "react";
import { WrapperDndContext } from "@/core/components/dnd/wrapper_dnd_context";
import { Droppable } from "@/core/components/dnd/droppable";
import activityStyles from "../activity.module.scss";
import { Draggable } from "@/core/components/dnd/draggable";
import { Item } from "@/lib/utils/dnd_setting/item";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";
import { dndSettingFrom } from "@/lib/exercises/fibe_service";
import { ActivityFooter } from "../layout/activity_footer";
import DndSetting from "@/lib/utils/dnd_setting/dnd_setting";

export function DragIntoBlanksExercise({
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
  const [dndSetting, setDndSetting] = useState(dndSettingFrom(exercise));
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsFinished(false);
    setDndSetting(dndSettingFrom(exercise));
    if (localData) {
      setDndSetting(DndSetting.from(localData));
      setIsFinished(true);
      return;
    }
  }, [exercise, localData]);

  const finishActivity = () => {
    if (saveLocalData) {
      saveLocalData(dndSetting, 0);
    }
    setIsFinished(true);
  };

  const reattemptToActivity = () => {
    if (saveLocalData) {
      saveLocalData(null, 0);
    }
    setDndSetting(dndSettingFrom(exercise));
    setIsFinished(false);
  };

  const handleStartDragging = (item: Item) => {
    setDndSetting(dndSetting.startDragging(item));
  };

  const handleStopDragging = (
    action:
      | {
          type: "on-space";
        }
      | {
          type: "on-blank";
          blankId: string;
        }
  ) => {
    setDndSetting(dndSetting.stopDragging(action));
  };

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <WrapperDndContext
          disabled={isFinished}
          blanks={dndSetting.blanks}
          board={dndSetting.board}
          startDragging={handleStartDragging}
          stopDragging={handleStopDragging}
        >
          <section aria-label="sorular">
            <ol className={`simple composite-question-list`}>
              {exercise.questions.map((item, index) => {
                return (
                  <li key={index}>
                    <section aria-label="soru içeriği">
                      {item.rawQuestion.map(({ id, type, value }) => {
                        if (type === "text") {
                          return <p key={id}>{value}</p>;
                        } else if (type === "blank") {
                          const blankItem = dndSetting.blanks.find(
                            (blank) => blank.id === id
                          )?.item;
                          const isCorrect = blankItem?.value === value;

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
                              key={id}
                              blankId={id}
                            >
                              {blankItem && (
                                <Draggable
                                  status={
                                    isFinished
                                      ? isCorrect
                                        ? "success"
                                        : "error"
                                      : "neutral"
                                  }
                                  disabled={isFinished}
                                  item={blankItem}
                                />
                              )}
                            </Droppable>
                          );
                        }
                      })}
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
