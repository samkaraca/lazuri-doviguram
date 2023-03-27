import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import EditorToolbar from "./editor_toolbar";
import EditorForm from "./editor_form";

export default function View() {
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
      <Paper
        sx={{
          width: "50%",
          minWidth: "22rem",
          maxWidth: "65rem",
          margin: "1rem auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EditorToolbar />
        <Box display="flex" flexDirection="column" padding="1rem">
          <EditorForm />
        </Box>
      </Paper>
    </Box>
  );
}
