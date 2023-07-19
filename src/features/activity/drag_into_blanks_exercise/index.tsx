import { DndSetting } from "@/core/models/entities/dnd_setting";
import { IViewModel } from "@/features/activity_editor/model/view_model";
import { useEffect, useState } from "react";
import { WrapperDndContext } from "@/core/components/dnd/wrapper_dnd_context";
import { Droppable } from "@/core/components/dnd/droppable";
import styles from "./styles.module.scss";
import { Draggable } from "@/core/components/dnd/draggable";
import { FillInBlanksQuestion } from "@/core/models/entities/question";

export function DragIntoBlanksExercise({
  isFormLocked,
  exercise,
}: {
  isFormLocked: boolean;
  exercise: FillInBlanksQuestion[];
}) {
  const [dndSetting, setDndSetting] = useState<DndSetting>(new DndSetting());

  useEffect(() => {
    let answersWithKeys = new Map();

    exercise.forEach((item, key) => {
      const answers = item.answer;
      answersWithKeys = new Map([
        ...Array.from(answersWithKeys),
        ...Array.from(answers),
      ]);
    });

    setDndSetting(new DndSetting({ answersWithKeys }));
  }, [exercise]);

  return (
    <WrapperDndContext
      disabled={isFormLocked}
      dndSetting={dndSetting}
      setDndSetting={setDndSetting}
    >
      <section aria-label="sorular">
        <ol className={`simple composite-question-list`}>
          {exercise.map((item, index) => {
            return (
              <li key={index}>
                <section aria-label="soru içeriği">
                  {Array.from(item.parsed, ([pieceKey, pieceValue], index) => {
                    if (index % 2 === 0) {
                      return <p key={pieceKey}>{pieceValue}</p>;
                    } else {
                      const blankKey = pieceKey;
                      const boardItemEntry =
                        dndSetting.getBoardItemContainingTheLocation(blankKey);
                      const isCorrect = dndSetting.check(blankKey);

                      return (
                        <Droppable
                          status={
                            isFormLocked
                              ? isCorrect
                                ? "success"
                                : "error"
                              : "neutral"
                          }
                          disabled={isFormLocked}
                          key={pieceKey}
                          blankKey={blankKey}
                        >
                          {boardItemEntry && (
                            <Draggable
                              classNameChip={`${
                                isFormLocked
                                  ? isCorrect
                                    ? "success"
                                    : "error"
                                  : ""
                              }`}
                              disabled={isFormLocked}
                              boardItemEntry={boardItemEntry}
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
  );
}
