import { Draggable } from "@/core/components/dnd/draggable";
import styles from "./styles.module.scss";
import { Item } from "@/lib/utils/dnd_setting/item";

export function BoardItemsBoard({
  board,
  disabled = false,
}: {
  board: Item[];
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
