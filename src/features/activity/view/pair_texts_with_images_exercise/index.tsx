import styles from "./styles.module.scss";
import { Droppable } from "@/components/dnd/droppable";
import { WrapperDndContext } from "@/components/dnd/wrapper_dnd_context";
import { Draggable } from "@/components/dnd/draggable";
import useViewModelContext from "../../view_model";
import IQAExercise from "@/lib/exercise/qa_exercise/qa_exercise";
import * as ExerciseServices from "@/lib/exercise/exercise_services";

export function PairTextsWithImagesExercise() {
  const {
    isSolved,
    activityData,
    replies,
    dndBoard,
    handleStartDragging,
    handleStopDragging,
  } = useViewModelContext()!;

  if (!replies || !dndBoard) return null;

  return (
    <WrapperDndContext
      disabled={isSolved}
      board={dndBoard}
      startDragging={handleStartDragging}
      stopDragging={handleStopDragging}
    >
      <section aria-label="soru kartları" className={styles["question-cards"]}>
        {(activityData.exercise as IQAExercise).template.map(
          ({ id, questionText }) => {
            const reply = ExerciseServices.getReply(id, replies);
            const isCorrect = ExerciseServices.checkReply(
              id,
              activityData.exercise,
              replies
            );

            return (
              <div className={`simple-card`} key={id}>
                <img
                  alt="soru fotoğrafı"
                  src={`${questionText}`}
                />
                {
                  <Droppable
                    className="full-width"
                    status={
                      isSolved ? (isCorrect ? "success" : "error") : "neutral"
                    }
                    disabled={isSolved}
                    key={id}
                    blankId={id}
                  >
                    {reply?.value && reply?.id && (
                      <Draggable
                        status={
                          isSolved
                            ? isCorrect
                              ? "success"
                              : "error"
                            : "neutral"
                        }
                        styleChip={{ width: "100%" }}
                        styleContainer={{ width: "100%" }}
                        disabled={isSolved}
                        item={{ id: reply.id, value: reply.value }}
                      />
                    )}
                  </Droppable>
                }
              </div>
            );
          }
        )}
      </section>
    </WrapperDndContext>
  );
}
