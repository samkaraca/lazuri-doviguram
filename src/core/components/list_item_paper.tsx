import { ElementChildren } from "@/core/types";
import { Paper } from "@mui/material";

export function ActivityListItemPaper({ children }: ElementChildren) {
  return (
    <Paper
      elevation={5}
      sx={{
        margin: "1rem",
        minHeight: "2.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Paper>
  );
}
