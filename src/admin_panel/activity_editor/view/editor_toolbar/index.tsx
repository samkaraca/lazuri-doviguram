import { Box, Divider, Checkbox, FormControlLabel } from "@mui/material";
import { ActivityTypeSelector } from "./activity_type_selector";
import { useViewModelContext } from "../../view_model";
import SelectiveConsumer from "@/core/components/selective_consumer";
import { IViewModel } from "../../model/view_model";

export default function Consumer() {
  const viewModel = useViewModelContext()!;

  return (
    <SelectiveConsumer
      observedParams={["textAppendix", "activityType"]}
      component={EditorToolbar}
      hook={() => viewModel}
    />
  );
}

function EditorToolbar(viewModel: IViewModel) {
  const {
    textAppendix,
    setTextAppendix,
    activityType,
    setActivityType,
    setExercise,
  } = viewModel;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      borderBottom="1px solid #aaaaaa"
      minHeight="5rem"
    >
      <FormControlLabel
        sx={{ marginRight: "0.3rem" }}
        labelPlacement="start"
        label="Aktivite Yönergesi"
        control={<Checkbox checked disabled />}
      />
      <Divider orientation="vertical" flexItem />
      <FormControlLabel
        sx={{ marginRight: "0.3rem" }}
        labelPlacement="start"
        label="Ek Bilgi"
        control={
          <Checkbox
            checked={textAppendix !== null}
            onChange={() =>
              setTextAppendix(textAppendix ? null : { content: "", header: "" })
            }
          />
        }
      />
      <Divider orientation="vertical" flexItem />
      <ActivityTypeSelector
        activityType={activityType}
        setActivityType={setActivityType}
        setExercise={setExercise}
      />
      <Divider orientation="vertical" flexItem />
    </Box>
  );
}
