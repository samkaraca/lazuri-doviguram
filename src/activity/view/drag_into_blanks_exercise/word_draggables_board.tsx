import { Box } from "@mui/material";
import { WordDraggable } from "./word_draggable";
import useViewModelContext from "@/activity/view_model";
import { WordChip } from "./word_chip";

export function WordDraggablesBoard() {
  const { board } = useViewModelContext()!;

  return (
    <Box
      id="board"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="center"
      rowGap="1rem"
      columnGap="1rem"
      minHeight="6.5rem"
      sx={{
        backgroundColor: "#dddddd",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      {board.map((boardItem) => {
        const { id, data } = boardItem;
        return (
          <WordDraggable key={id} boardItem={boardItem}>
            <WordChip word={data} />
          </WordDraggable>
        );
      })}
    </Box>
  );
}
