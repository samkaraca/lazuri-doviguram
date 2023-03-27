import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "../model/view_model";
import { useViewModelContext } from "../view_model";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      component={CreateDialog}
      hook={() => viewModel}
      observedParams={["dialogOpen", "newDirectoryName"]}
    />
  );
}

function CreateDialog(viewModel: IViewModel) {
  const {
    dialogOpen,
    setDialogOpen,
    newDirectoryName,
    setNewDirectoryName,
    saveNewDirectory,
  } = viewModel;

  return (
    <Dialog
      disableRestoreFocus
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
        setNewDirectoryName("");
      }}
    >
      <form onSubmit={saveNewDirectory}>
        <Paper
          sx={{
            padding: "1rem",
            minWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <DialogTitle>Bir başlık girin</DialogTitle>
          <DialogContent>
            <TextField
              autoComplete="off"
              onChange={(e) => setNewDirectoryName(e.target.value)}
              value={newDirectoryName}
              autoFocus
              fullWidth
              size="small"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" type="submit">
              Oluştur
            </Button>
          </DialogActions>
        </Paper>
      </form>
    </Dialog>
  );
}
