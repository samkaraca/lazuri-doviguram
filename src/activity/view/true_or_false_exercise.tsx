import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import useViewModelContext from "../view_model";

export function TrueOrFalseExercise() {
  const viewModel = useViewModelContext()!;
  const { trueOrFalseExercise, exerciseLocked } = viewModel;

  return (
    <List>
      {trueOrFalseExercise.map((item, index) => {
        const { text, isTrue } = item.content;

        return (
          <ListItem
            key={item.id}
            sx={{ paddingY: "1rem" }}
            disablePadding
            secondaryAction={
              <RadioGroup row sx={{ position: "relative", right: "-1rem" }}>
                <FormControlLabel
                  control={<Radio />}
                  value="true"
                  label="Doğru"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="false"
                  label="Yanlış"
                />
              </RadioGroup>
            }
          >
            <ListItemText
              sx={{ marginRight: "13rem", overflowWrap: "anywhere" }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography marginRight="1rem">{index + 1}.</Typography>
                <Typography>{text}</Typography>
              </Box>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}
