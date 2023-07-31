import { Activity } from "@/features/activity";
import { Activity as CActivity } from "@/lib/activity/activity";
import { LocalExerciseDTO } from "@/lib/exercises/local_exercise_dto";
import { LocalExerciseRepository } from "@/lib/exercises/local_exercise_repository";
import { poppins } from "@/pages/_app";
import { Dialog } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function ActivityDialog({
  isActivityDialogOpen,
  closeActivity,
  activeActivity,
}: {
  isActivityDialogOpen: boolean;
  closeActivity: VoidFunction;
  activeActivity?: CActivity;
}) {
  const localExerciseRepo = useRef(new LocalExerciseRepository());
  const [localData, setLocalData] = useState<LocalExerciseDTO>();

  useEffect(() => {
    if (activeActivity) {
      const activity = localExerciseRepo.current.getExercise(activeActivity.id);
      if (activity) {
        if (activity.savedAt < activeActivity.savedAt) {
          localExerciseRepo.current.removeExerciseData(activeActivity.id);
        }
        setLocalData(activity);
      }
    }
  }, [activeActivity]);

  const handleSaveLocalData = (data: any, grade: number) => {
    if (activeActivity) {
      localExerciseRepo.current.saveExercise(activeActivity.id, {
        savedAt: Date.now(),
        data,
        grade,
      });
    }
  };

  return (
    <Dialog
      className={poppins.className}
      open={isActivityDialogOpen}
      onClose={closeActivity}
      fullWidth
      maxWidth="md"
      scroll="body"
    >
      {activeActivity && (
        <Activity
          saveLocalData={handleSaveLocalData}
          localData={localData?.data}
          closeActivity={closeActivity}
          activity={activeActivity}
        />
      )}
    </Dialog>
  );
}
