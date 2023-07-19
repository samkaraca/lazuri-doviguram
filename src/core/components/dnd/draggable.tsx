import { BoardItemEntry } from "@/core/models/entities/dnd_setting";
import { useDraggable } from "@dnd-kit/core";

export function Draggable({
  boardItemEntry,
  disabled = false,
  classNameContainer,
  classNameChip,
}: {
  disabled: boolean;
  boardItemEntry: BoardItemEntry;
  classNameContainer?: string;
  classNameChip?: string;
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
      }}
      className={`${classNameContainer}`}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <div className={`board-item ${classNameChip}`}>
        <p>{boardItem.value}</p>
      </div>
    </div>
  );
}
