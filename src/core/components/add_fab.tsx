import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
  onClick: () => void;
}

export function AddFab(props: Props) {
  return (
    <Fab
      onClick={props.onClick}
      color="secondary"
      size="small"
      sx={{
        position: "absolute",
        bottom: "-1.4rem",
        right: "0",
        left: "0",
        margin: "0 auto",
      }}
    >
      <Add />
    </Fab>
  );
}
