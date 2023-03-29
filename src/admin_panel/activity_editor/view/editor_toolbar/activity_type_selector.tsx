import { Box, FormHelperText, MenuItem, Select } from "@mui/material";
import {
  ActivityType,
  activityTypes,
  initialActivityType,
} from "../../model/activity/activity";
import { Dispatch, SetStateAction } from "react";

interface Props {
  activityType: ActivityType;
  setActivityType: Dispatch<SetStateAction<ActivityType>>;
  dispatchTypeOrDragExercise: Dispatch<{
    type: "change" | "add" | "remove" | "reset";
    id: string;
    text: string;
  }>;
  dispatchTrueOrFalseExercise: Dispatch<{
    type: "add" | "remove" | "reset" | "changeText" | "changeIsTrue";
    isTrue: boolean;
    text: string;
    id: string;
  }>;
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
          dispatchTypeOrDragExercise({ type: "reset", id: "", text: "" });
          dispatchTrueOrFalseExercise({
            type: "reset",
            id: "",
            text: "",
            isTrue: false,
          });
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
