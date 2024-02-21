import { DndContext } from "@dnd-kit/core";
import { ReactNode } from "react";
import { BoardItemsBoard } from "./draggables_board";
import styles from "./styles.module.scss";
import IDraggable from "@/lib/dnd_setting/draggable";

export function WrapperDndContext({
  board,
  startDragging,
  stopDragging,
  children,
  disabled = false,
}: {
  board: IDraggable[];
  startDragging: (item: IDraggable) => void;
  stopDragging: (
    action:
      | {
          type: "on-space";
        }
      | {
          type: "on-blank";
          blankId: string;
        }
  ) => void;
  children: ReactNode;
  disabled: boolean;
}) {
  return (
    <DndContext
      modifiers={[]}
      onDragEnd={(e) => {
        const blankId = e.over?.data.current?.blankId;
        if (blankId) {
          stopDragging({ type: "on-blank", blankId });
        } else {
          stopDragging({ type: "on-space" });
        }
      }}
      onDragStart={(e) => {
        startDragging(e.active.data.current as any);
      }}
    >
      <section className={styles["exercise-content"]} aria-label="etkinlik">
        <BoardItemsBoard disabled={disabled} board={board} />
        {children}
      </section>
    </DndContext>
  );
}
