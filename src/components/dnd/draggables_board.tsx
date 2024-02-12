import { Draggable } from "@/components/dnd/draggable";
import styles from "./styles.module.scss";
import IDraggable from "@/utils/dnd_setting/draggable";

export function BoardItemsBoard({
  board,
  disabled = false,
}: {
  board: IDraggable[];
  disabled: boolean;
}) {
  return (
    <section
      aria-label="sürüklenebilir cevaplar"
      className={`${styles["board-items-board"]}`}
    >
      {board.map((item) => {
        return (
          <Draggable
            status="neutral"
            disabled={disabled}
            key={item.id}
            item={item}
          />
        );
      })}
    </section>
  );
}
