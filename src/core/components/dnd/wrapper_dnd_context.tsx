import { DndSetting } from "@/core/models/entities/dnd_setting";
import { DndContext } from "@dnd-kit/core";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { BoardItemsBoard } from "./draggables_board";
import styles from "./styles.module.scss";

export function WrapperDndContext({
  children,
  dndSetting,
  setDndSetting,
  disabled = false,
}: {
  children: ReactNode;
  dndSetting: DndSetting;
  setDndSetting: Dispatch<SetStateAction<DndSetting>>;
  disabled: boolean;
}) {
  return (
    <DndContext
      onDragEnd={(e) => {
        const blankKey = e.over?.data.current?.blankKey;
        if (blankKey) {
          setDndSetting(dndSetting.endMoving({ type: "on-blank", blankKey }));
        } else {
          setDndSetting(dndSetting.endMoving({ type: "on-space" }));
        }
      }}
      onDragStart={(e) => {
        setDndSetting(dndSetting.startMoving(e.active.data.current as any));
      }}
    >
      <section className={styles["exercise-content"]} aria-label="etkinlik">
        <BoardItemsBoard
          disabled={disabled}
          boardItems={dndSetting.boardItems}
        />
        {children}
      </section>
    </DndContext>
  );
}
