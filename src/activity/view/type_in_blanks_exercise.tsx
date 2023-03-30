import {
  Box,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import useViewModelContext from "../view_model";

export function TypeInBlanksExercise() {
  const viewModel = useViewModelContext()!;
  const { typeOrDragExercise } = viewModel;

  return (
    <List>
      {typeOrDragExercise.map((item, index) => {
        return (
          <ListItem
            disablePadding
            sx={{ paddingBottom: "1.5rem", overflowWrap: "anywhere" }}
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
                  {item.content.processedContent.map((piece, i) => {
                    switch (piece.type) {
                      case "text-input":
                        return (
                          <Input
                            color="success"
                            sx={{
                              display: "inline-block",
                              marginX: "0.5rem",
                              width: "10rem",
                            }}
                            key={i}
                            size="small"
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
