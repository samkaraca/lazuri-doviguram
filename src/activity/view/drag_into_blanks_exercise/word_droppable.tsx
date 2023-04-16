import { IBoardItemPiecePointer } from "@/activity/model/view_model";
import { useDroppable } from "@dnd-kit/core";
import { Box, Chip } from "@mui/material";
import { WordChip } from "./word_chip";
import useViewModelContext from "@/activity/view_model";

interface Props {
  boardItemPointer: IBoardItemPiecePointer;
}

export function WordDroppable({ boardItemPointer }: Props) {
  const { placeBoardItem } = useViewModelContext()!;
  const { itemIndex, pieceIndex, piece } = boardItemPointer;
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${piece.id}`,
    data: { piece, itemIndex, pieceIndex },
  });

  return (
    <Box sx={{ display: "inline-block" }}>
      {piece.userAnswer ? (
        <WordChip
          word={piece.userAnswer.data}
          onDelete={() =>
            placeBoardItem(
              true,
              { id: piece.userAnswer!.id, data: piece.userAnswer!.data },
              { piece, itemIndex, pieceIndex }
            )
          }
        />
      ) : (
        <Chip
          ref={setNodeRef}
          sx={{
            width: "9rem",
            borderRadius: "0.3rem",
            padding: "0.85rem",
            boxShadow: isOver ? "0 0 0.2rem 0.05rem dodgerblue" : "none",
          }}
          size="small"
          variant="outlined"
        />
      )}
    </Box>
  );
}
