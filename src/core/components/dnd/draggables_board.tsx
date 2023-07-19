import { DndSetting } from "@/core/models/entities/dnd_setting";
import { Draggable } from "@/core/components/dnd/draggable";
import styles from "./styles.module.scss";

export function BoardItemsBoard({
  boardItems,
  disabled = false,
}: {
  boardItems: DndSetting["boardItems"];
  disabled: boolean;
}) {
  return (
    <section
      aria-label="sürüklenebilir cevaplar"
      className={`${styles["board-items-board"]}`}
    >
      {Array.from(boardItems)
        .filter(([key, boardItem]) => boardItem.location === null)
        .map(([key, boardItem]) => {
          return (
            <Draggable
              disabled={disabled}
              key={`draggable-${key}`}
              boardItemEntry={[key, boardItem]}
            />
          );
        })}
    </section>
  );
}
