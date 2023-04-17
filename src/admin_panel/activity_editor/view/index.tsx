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
import { ActivityPreview } from "./activity_preview";

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
        <Toolbar sx={{}}>
          <Typography variant="h5">Aktivite Editörü</Typography>
        </Toolbar>
      </AppBar>
      <Box
        padding="1.5rem 1.5rem 0 1.5rem"
        display="flex"
        flexDirection={largeMediaQuery ? "row" : "column"}
        alignItems={largeMediaQuery ? "start" : "center"}
        rowGap="2rem"
        justifyContent={largeMediaQuery ? "space-evenly" : "space-around"}
      >
        <Paper
          sx={{
            width: largeMediaQuery ? "46%" : "80%",
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
          width={largeMediaQuery ? "46%" : "80%"}
        >
          <ActivityPreview />
        </Box>
      </Box>
    </Box>
  );
}
