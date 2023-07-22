import { BoardItemEntry } from "@/core/models/entities/dnd_setting";
import { useDraggable } from "@dnd-kit/core";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";

export function Draggable({
  boardItemEntry,
  disabled = false,
  status,
  styleChip,
  styleContainer,
}: {
  disabled: boolean;
  boardItemEntry: BoardItemEntry;
  status: "error" | "success" | "neutral";
  styleChip?: CSSProperties;
  styleContainer?: CSSProperties;
}) {
  const [key, boardItem] = boardItemEntry;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    disabled,
    id: `draggable-${key}-${boardItem.value}`,
    data: boardItemEntry,
  });

  return (
    <div
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        display: "inline-block",
        ...styleContainer,
      }}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <div
        style={{ ...styleChip }}
        className={`${styles["board-item"]} ${
          status !== "neutral" ? styles[status] : ""
        }`}
      >
        <p>{boardItem.value}</p>
      </div>
    </div>
  );
}
