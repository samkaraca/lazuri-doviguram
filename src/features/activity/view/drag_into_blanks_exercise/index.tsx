import { WrapperDndContext } from "@/components/dnd/wrapper_dnd_context";
import { Droppable } from "@/components/dnd/droppable";
import { Draggable } from "@/components/dnd/draggable";
import useViewModelContext from "../../view_model";
import IFillInBlanksExercise from "@/lib/exercise/fill_in_blanks_exercise/fill_in_blanks_exercise";
import * as ExerciseServices from "@/lib/exercise/exercise_services";

export function DragIntoBlanksExercise() {
  const {
    isSolved,
    activityData,
    dndBoard,
    replies,
    handleStartDragging,
    handleStopDragging,
  } = useViewModelContext()!;

  if (!dndBoard || !replies) return null;

  return (
    <WrapperDndContext
      disabled={isSolved}
      board={dndBoard}
      startDragging={handleStartDragging}
      stopDragging={handleStopDragging}
    >
      <section aria-label="sorular">
        <ol className={`simple composite-question-list`}>
          {(activityData.exercise as IFillInBlanksExercise).template.map(
            (item, index) => {
              return (
                <li key={index}>
                  <section aria-label="soru içeriği">
                    {item.atoms.map((piece) => {
                      const { id, type } = piece;
                      if (type === "text") {
                        return (
                          <p
                            key={id}
                            dangerouslySetInnerHTML={{
                              __html: piece.value,
                            }}
                          />
                        );
                      } else if (type === "blank") {
                        const reply = ExerciseServices.getReply(id, replies);
                        const isCorrect = ExerciseServices.checkReply(
                          id,
                          activityData.exercise,
                          replies
                        );

                        return (
                          <Droppable
                            status={
                              isSolved
                                ? isCorrect
                                  ? "success"
                                  : "error"
                                : "neutral"
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
                                disabled={isSolved}
                                item={{
                                  id: reply.id,
                                  value: reply.value,
                                }}
                              />
                            )}
                          </Droppable>
                        );
                      }
                    })}
                  </section>
                </li>
              );
            }
          )}
        </ol>
      </section>
    </WrapperDndContext>
  );
}
