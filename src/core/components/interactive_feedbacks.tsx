import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export function InteractiveFeedbacks({
  stalling,
  snackbar,
  setSnackbar,
}: {
  stalling: boolean;
  snackbar: {
    message: string;
    severity: "error" | "success" | "warning" | "info";
    visible: boolean;
  };
  setSnackbar: Dispatch<
    SetStateAction<{
      message: string;
      severity: "error" | "success" | "warning" | "info";
      visible: boolean;
    }>
  >;
}) {
  return (
    <>
      <Backdrop sx={{ zIndex: 200 }} open={stalling}>
        <CircularProgress />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.visible}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
          variant="filled"
          closeText="Kapat"
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
