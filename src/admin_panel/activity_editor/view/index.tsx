import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditorToolbar from "./editor_toolbar";
import EditorForm from "./editor_form";
import { Activity } from "@/activity";

export default function View() {
  const theme = useTheme();
  const largeMediaQuery = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        height: "100vh",
        overflowX: "hidden",
        padding: 0,
        paddingBottom: "2rem",
        backgroundColor: "#dddddd",
      }}
    >
      <AppBar position="relative">
        <Toolbar
          sx={{
            maxWidth: "65rem",
            margin: "0 auto",
            width: "50%",
            minWidth: "22rem",
          }}
        >
          <Typography variant="h5">Aktivite Editörü</Typography>
        </Toolbar>
      </AppBar>
      <Box
        padding="1.5rem 1.5rem 0 1.5rem"
        display="flex"
        flexDirection={largeMediaQuery ? "row" : "column"}
        alignItems={largeMediaQuery ? "start" : "center"}
        rowGap="2rem"
        justifyContent="space-evenly"
      >
        <Paper
          sx={{
            width: largeMediaQuery ? "40%" : "70%",
            minWidth: "22rem",
            maxWidth: "60rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <EditorToolbar />
          <Box display="flex" flexDirection="column" padding="1rem">
            <EditorForm />
          </Box>
        </Paper>
        <Box
          maxWidth="60rem"
          minWidth="22rem"
          width={largeMediaQuery ? "40%" : "70%"}
        >
          <Activity />
        </Box>
      </Box>
    </Box>
  );
}
