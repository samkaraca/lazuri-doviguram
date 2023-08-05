import { Activity } from "@/features/activity";
import IActivity from "@/lib/activity/activity";
import { poppins } from "@/pages/_app";
import { Dialog } from "@mui/material";

export default function ActivityDialog({
  isActivityDialogOpen,
  closeActivity,
  activeActivity,
}: {
  isActivityDialogOpen: boolean;
  closeActivity: VoidFunction;
  activeActivity?: IActivity;
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
      {activeActivity && (
        <Activity activityData={activeActivity} closeActivity={closeActivity} />
      )}
    </Dialog>
  );
}
