import { Box, List, ListItem } from "@mui/material";
import { WordDraggable } from "./word_draggable";
import useViewModelContext from "@/activity/view_model";
import { WordChip } from "./word_chip";

export function WordDraggablesBoard() {
  const { board } = useViewModelContext()!;

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="center"
      rowGap="1rem"
      columnGap="1rem"
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
