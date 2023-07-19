import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

export function Droppable({
  children,
  blankKey,
  disabled = false,
  status = "neutral",
  className = "",
}: {
  children?: ReactNode;
  blankKey: string;
  disabled?: boolean;
  status: "error" | "success" | "neutral";
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${blankKey}`,
    disabled,
    data: { blankKey },
  });

  return (
    <div
      className={`${styles["droppable"]} ${isOver ? styles["over"] : ""} ${
        status === "neutral" ? "" : styles[status]
      } ${className}`}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
