import { useDraggable } from "@dnd-kit/core";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";
import IDraggable from "@/utils/dnd_setting/draggable";

export function Draggable({
  item,
  disabled = false,
  status,
  styleChip,
  styleContainer,
}: {
  disabled: boolean;
  item: IDraggable;
  status: "error" | "success" | "neutral";
  styleChip?: CSSProperties;
  styleContainer?: CSSProperties;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    disabled,
    id: item.id,
    data: item,
  });

  return (
    <div
      style={{
        touchAction: "none",
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
        <p>{item.value}</p>
      </div>
    </div>
  );
}
