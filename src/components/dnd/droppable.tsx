import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

export function Droppable({
  children,
  blankId,
  disabled = false,
  status = "neutral",
  className = "",
}: {
  children?: ReactNode;
  blankId: string;
  disabled?: boolean;
  status: "error" | "success" | "neutral";
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: blankId,
    disabled,
    data: { blankId },
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
