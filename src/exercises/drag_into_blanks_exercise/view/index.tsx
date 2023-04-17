import { DndContext, DragOverlay } from "@dnd-kit/core";
import { WordDraggablesBoard } from "./word_draggables_board";
import { QuestionsList } from "./questions_list";
import { WordChip } from "./word_chip";
import { Box } from "@mui/material";
import { useViewModelContext } from "../view_model";
import { IBoardItem, IBoardItemPiecePointer } from "../model/view_model";

export function View() {
  const { draggedItem, setDraggedItem, placeBoardItem } =
    useViewModelContext()!;

  return (
    <DndContext
      onDragEnd={(e) => {
        const droppable = e.over?.data.current as IBoardItemPiecePointer;
        const draggable = e.active.data.current as IBoardItem;
        if (droppable) placeBoardItem(false, draggable, droppable);
        setDraggedItem(null);
      }}
      onDragStart={(e) => setDraggedItem(e.active.data.current as IBoardItem)}
    >
      <Box display="flex" flexDirection="column" rowGap="3rem" marginY="3rem">
        <WordDraggablesBoard />
        <QuestionsList />
      </Box>
      <DragOverlay>
        {draggedItem && <WordChip word={draggedItem.data} />}
      </DragOverlay>
    </DndContext>
  );
}
