import { Box, FormHelperText, MenuItem, Select } from "@mui/material";
import {
  ActivityType,
  IExerciseItem,
  IExerciseItemContent,
  activityTypes,
  initialActivityType,
} from "../../model/activity/activity";
import { Dispatch, SetStateAction } from "react";

interface Props {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  setExercise: Dispatch<SetStateAction<IExerciseItem<IExerciseItemContent>[]>>;
}

export function ActivityTypeSelector(props: Props) {
  const { setActivityType, activityType, setExercise } = props;

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
          setExercise([]);
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
