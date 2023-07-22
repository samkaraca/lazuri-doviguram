import { Activity as IActivity } from "@/core/models/entities/learning_unit";
import { Activity } from "@/features/activity";
import { poppins } from "@/pages/_app";
import { Dialog } from "@mui/material";

export default function ActivityDialog({
  isActivityDialogOpen,
  closeActivity,
  activeActivity,
}: {
  isActivityDialogOpen: boolean;
  closeActivity: VoidFunction;
  activeActivity?: IActivity<any>;
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
      {activeActivity && <Activity activity={activeActivity} />}
    </Dialog>
  );
}
