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
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { useDndSetting } from "@/lib/utils/dnd_setting/use_dnd_setting";
import { Item } from "@/lib/utils/dnd_setting/item";
import { Blank } from "@/lib/utils/dnd_setting/blank";
import { nanoid } from "nanoid";

export function PairTextsWithImagesExercise({
  exercise,
  closeActivity,
}: {
  exercise: SimpleExercise;
  closeActivity: VoidFunction;
}) {
  const { blanks, board, startDragging, stopDragging } = useDndSetting({
    boardData: exercise.questions.map(
      (question) => new Item(question.id, question.answer)
    ),
    blanksData: exercise.questions.map(
      (question) => new Blank(question.id, question.answer, null)
    ),
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {}, [exercise]);

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
          <section
            aria-label="soru kartları"
            className={styles["question-cards"]}
          >
            {exercise.questions.map(({ id, question }, index) => {
              return (
                <div className={`simple-card`} key={id}>
                  <img
                    alt="soru fotoğrafı"
                    src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${question}`}
                  />
                  {
                    <Droppable
                      className="full-width"
                      // status={
                      //   isFinished
                      //     ? isCorrect
                      //       ? "success"
                      //       : "error"
                      //     : "neutral"
                      // }
                      status={"neutral"}
                      disabled={isFinished}
                      key={id}
                      blankId={id}
                    >
                      {blanks.find((blank) => blank.id === id)?.item && (
                        <Draggable
                          status={"neutral"}
                          // status={
                          //   isFinished
                          //     ? isCorrect
                          //       ? "success"
                          //       : "error"
                          //     : "neutral"
                          // }
                          styleChip={{ width: "100%" }}
                          styleContainer={{ width: "100%" }}
                          disabled={isFinished}
                          item={blanks.find((blank) => blank.id === id)!.item!}
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
      {/* <ActivityFooter
        closeActivity={closeActivity}
        finishActivity={finishActivity}
        isFinished={isFinished}
        reattemptToActivity={reattemptToActivity}
      /> */}
    </article>
  );
}
