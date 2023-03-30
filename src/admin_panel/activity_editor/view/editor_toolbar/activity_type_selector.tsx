import { Box, FormHelperText, MenuItem, Select } from "@mui/material";
import {
  ActivityType,
  activityTypes,
  initialActivityType,
} from "../../model/activity/activity";
import { Dispatch, SetStateAction } from "react";
import {
  ITrueOrFalseExerciseItemAction,
  ITypeOrDragExerciseItemAction,
} from "../../model/view_model";

interface Props {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  dispatchTypeOrDragExercise: Dispatch<ITypeOrDragExerciseItemAction>;
  dispatchTrueOrFalseExercise: Dispatch<ITrueOrFalseExerciseItemAction>;
}

export function ActivityTypeSelector(props: Props) {
  const {
    setActivityType,
    activityType,
    dispatchTypeOrDragExercise,
    dispatchTrueOrFalseExercise,
  } = props;

  return (
    <Box
      marginX="1rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
      bottom="0.2rem"
      minWidth="10rem"
    >
      <FormHelperText sx={{ color: "black" }}>Aktivite Türü</FormHelperText>
      <Select
        value={activityType}
        onChange={(e) => {
          setActivityType(e.target.value as ActivityType);
          dispatchTypeOrDragExercise({ type: "reset" });
          dispatchTrueOrFalseExercise({ type: "reset" });
        }}
        size="small"
        defaultValue={initialActivityType}
      >
        {activityTypes.map((type) => {
          return (
            <MenuItem value={type.type} key={type.type}>
              {type.label}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
