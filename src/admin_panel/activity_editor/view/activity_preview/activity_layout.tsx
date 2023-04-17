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
import { Context, ReactNode, useContext, useMemo } from "react";
import useViewModelContext from "../../view_model";

export interface IActivityLayoutContext {
  explanation: any;
  textAppendix: any;
}

export function ActivityLayout({ children }: { children: ReactNode }) {
  const viewModel = useViewModelContext()!;
  const { explanation, textAppendix } = viewModel;

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
        {children}
        <Stack direction="row" justifyContent="end">
          <Button variant="contained" onClick={() => {}}>
            BİTİR
          </Button>
        </Stack>
      </Paper>
    </ThemeProvider>
  );
}
