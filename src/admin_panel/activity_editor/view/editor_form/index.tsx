import { Box, Button, Stack, TextField } from "@mui/material";
import TextAppendix from "./text_appendix";
import Activity from "./activity";
import useViewModelContext from "../../view_model";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "../../model/view_model";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["explanation", "save"]}
      hook={() => viewModel}
      component={EditorForm}
    />
  );
}

function EditorForm(viewModel: IViewModel) {
  const { save, explanation, setExplanation } = viewModel;

  return (
    <Box display="flex" flexDirection="column" rowGap="1rem">
      <TextField
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        multiline
        label="Aktivite yönergesi"
        fullWidth
      />
      <TextAppendix />
      <Activity />
      <Stack direction="row" justifyContent="end">
        <Button onClick={save} variant="contained">
          Kaydet
        </Button>
      </Stack>
    </Box>
  );
}
