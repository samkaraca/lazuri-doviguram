import { DndContext } from "@dnd-kit/core";
import { ReactNode } from "react";
import { BoardItemsBoard } from "./draggables_board";
import styles from "./styles.module.scss";
import { Item } from "@/lib/utils/dnd_setting/item";
import { Blank } from "@/lib/utils/dnd_setting/blank";

export function WrapperDndContext({
  board,
  blanks,
  startDragging,
  stopDragging,
  children,
  disabled = false,
}: {
  board: Item[];
  blanks: Blank[];
  startDragging: (item: Item) => void;
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
