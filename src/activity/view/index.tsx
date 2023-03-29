import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { TypeInBlanksExercise } from "./type_in_blanks_exercise";
import { TrueOrFalseExercise } from "./true_or_false_exercise";
import useViewModelContext from "../view_model";
import { useMemo } from "react";

export function View() {
  const viewModel = useViewModelContext()!;
  const { activityType, explanation, textAppendix, setExerciseLocked } =
    viewModel;

  const defaultTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme(defaultTheme, {
        components: {
          MuiInput: {
            styleOverrides: { input: { padding: "0 0 1px 0" } },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {explanation}
        </Typography>
        {textAppendix && (
          <Accordion variant="outlined">
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{textAppendix.header}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{textAppendix.content}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
        {activityType === "type-in-blanks" ? (
          <TypeInBlanksExercise />
        ) : activityType === "true-or-false" ? (
          <TrueOrFalseExercise />
        ) : null}
        <Stack direction="row" justifyContent="end">
          <Button variant="contained" onClick={() => {}}>
            BİTİR
          </Button>
        </Stack>
      </Paper>
    </ThemeProvider>
  );
}
