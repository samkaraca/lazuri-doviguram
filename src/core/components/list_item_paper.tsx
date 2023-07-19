import { Paper } from "@mui/material";
import { ReactNode } from "react";

export function ActivityListItemPaper({ children }: { children: ReactNode }) {
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
