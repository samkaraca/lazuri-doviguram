import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { useEffect, useState } from "react";
import { Droppable } from "@/core/components/dnd/droppable";
import { WrapperDndContext } from "@/core/components/dnd/wrapper_dnd_context";
import { Draggable } from "@/core/components/dnd/draggable";
import { ActivityFooter } from "../layout/activity_footer";
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { Item } from "@/lib/utils/dnd_setting/item";
import { dndSettingFrom } from "@/lib/exercises/se_service";
import DndSetting from "@/lib/utils/dnd_setting/dnd_setting";

export function PairTextsWithImagesExercise({
  localData,
  saveLocalData,
  closeActivity,
  exercise,
}: {
  localData?: any;
  saveLocalData?: (data: any, grade: number) => void;
  closeActivity: VoidFunction;
  exercise: SimpleExercise;
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
          <section
            aria-label="soru kartları"
            className={styles["question-cards"]}
          >
            {exercise.questions.map(({ id, question, answer }) => {
              const blank = dndSetting.blanks.find((r) => r.id === id);
              const isCorrect = blank?.item?.value === answer;

              return (
                <div className={`simple-card`} key={id}>
                  <img
                    alt="soru fotoğrafı"
                    src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${question}`}
                  />
                  {
                    <Droppable
                      className="full-width"
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
                      {dndSetting.blanks.find((blank) => blank.id === id)
                        ?.item && (
                        <Draggable
                          status={
                            isFinished
                              ? isCorrect
                                ? "success"
                                : "error"
                              : "neutral"
                          }
                          styleChip={{ width: "100%" }}
                          styleContainer={{ width: "100%" }}
                          disabled={isFinished}
                          item={
                            dndSetting.blanks.find((blank) => blank.id === id)!
                              .item!
                          }
                        />
                      )}
                    </Droppable>
                  }
                </div>
              );
            })}
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
