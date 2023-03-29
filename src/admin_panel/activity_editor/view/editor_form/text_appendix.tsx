import { Box, Divider, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import useViewModelContext from "../../view_model";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "../../model/view_model";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["textAppendix"]}
      hook={() => viewModel}
      component={TextAppendix}
    />
  );
}

function TextAppendix(viewModel: IViewModel) {
  const { textAppendix, setTextAppendix } = viewModel;

  return (
    textAppendix && (
      <Box
        display={textAppendix ? "flex" : "none"}
        flexDirection="column"
        rowGap="1rem"
      >
        <Divider />
        <TextField
          size="small"
          label="Ek bilgi başlağı"
          value={textAppendix.header}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTextAppendix((prev) => ({
              content: prev?.content ?? "",
              header: e.target.value,
            }))
          }
        />
        <TextField
          id="extra-information-text-field"
          value={textAppendix.content}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTextAppendix((prev) => ({
              header: prev?.header ?? "",
              content: e.target.value,
            }))
          }
          label="Ek bilgi"
          multiline
          fullWidth
        />
        <Divider />
      </Box>
    )
  );
}
