import styles from "./styles.module.scss";
import activityStyles from "../activity.module.scss";
import { DndSetting } from "@/core/models/entities/dnd_setting";
import { useEffect, useRef, useState } from "react";
import { Droppable } from "@/core/components/dnd/droppable";
import { WrapperDndContext } from "@/core/components/dnd/wrapper_dnd_context";
import { Draggable } from "@/core/components/dnd/draggable";
import { SimpleQuestion } from "@/core/models/entities/question";
import { UserExerciseLocalRepositoryImplementation } from "../services/user_exercise_local_repository_implementation";
import { ActivityFooter } from "../layout/activity_footer";

export function PairTextsWithImagesExercise({
  exercise,
  activityId,
  closeActivity,
}: {
  exercise: SimpleQuestion[];
  activityId: string;
  closeActivity: VoidFunction;
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [isFinished, setIsFinished] = useState(false);
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
    const answersWithKeys = new Map(
      exercise.map(({ answer, question }, i) => {
        return [`${i}-${question}`, answer];
      })
    );

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
          <section
            aria-label="soru kartları"
            className={styles["question-cards"]}
          >
            {exercise.map((item, index) => {
              const { question, answer } = item;
              const blankKey = `${index}-${question}`;
              const boardItemEntry =
                dndSetting.getBoardItemContainingTheLocation(blankKey);
              const isCorrect = dndSetting.check(blankKey);

              return (
                <div className={`simple-card`} key={index}>
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
                      key={blankKey}
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
                          styleChip={{ width: "100%" }}
                          styleContainer={{ width: "100%" }}
                          disabled={isFinished}
                          boardItemEntry={boardItemEntry}
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
