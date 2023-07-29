import { Activity } from "@/features/activity";
import { Activity as CActivity } from "@/lib/activity/activity";
import { poppins } from "@/pages/_app";
import { Dialog } from "@mui/material";

export default function ActivityDialog({
  isActivityDialogOpen,
  closeActivity,
  activeActivity,
  activeActivityId,
}: {
  activeActivityId: string | null;
  isActivityDialogOpen: boolean;
  closeActivity: VoidFunction;
  activeActivity?: CActivity;
}) {
  return (
    <Dialog
      className={poppins.className}
      open={isActivityDialogOpen}
      onClose={closeActivity}
      fullWidth
      maxWidth="md"
      scroll="body"
    >
      {activeActivity && activeActivityId && (
        <Activity
          activityId={activeActivityId}
          closeActivity={closeActivity}
          activity={activeActivity}
        />
      )}
    </Dialog>
  );
}
