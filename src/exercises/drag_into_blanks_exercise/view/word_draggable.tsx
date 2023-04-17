import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { IBoardItem } from "../model/view_model";

export interface Props {
  children: ReactNode;
  boardItem: IBoardItem;
}

export function WordDraggable({ boardItem, children }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boardItem.id,
    data: boardItem,
  });

  return (
    <Box
      sx={{ visibility: isDragging ? "hidden" : "unset" }}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      {children}
    </Box>
  );
}
