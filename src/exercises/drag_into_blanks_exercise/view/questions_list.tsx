import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { WordDroppable } from "./word_droppable";
import { useViewModelContext } from "../view_model";

export function QuestionsList() {
  const { exerciseItems } = useViewModelContext()!;

  return (
    <List disablePadding>
      {exerciseItems.map((item, index) => {
        return (
          <ListItem
            disablePadding
            sx={{ overflowWrap: "anywhere" }}
            key={item.id}
          >
            <ListItemText>
              <Box display="flex">
                <Typography
                  minWidth="1rem"
                  lineHeight="2.5rem"
                  marginRight="1rem"
                >
                  {index + 1}.
                </Typography>
                <Box lineHeight="2.5rem">
                  {item.pieces.map((piece, i) => {
                    switch (piece.type) {
                      case "text-input":
                        return (
                          <WordDroppable
                            key={piece.id}
                            boardItemPointer={{
                              itemIndex: index,
                              pieceIndex: i,
                              piece,
                            }}
                          />
                        );

                      case "text":
                        return (
                          <Typography
                            display="contents"
                            whiteSpace="pre-wrap"
                            key={i}
                          >
                            {piece.text}
                          </Typography>
                        );

                      default:
                        return null;
                    }
                  })}
                </Box>
              </Box>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}
