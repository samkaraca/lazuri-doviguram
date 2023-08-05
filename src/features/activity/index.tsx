import IActivity from "@/lib/activity/activity";
import { View } from "./view";
import { ViewModel } from "./view_model";

export function Activity({
  activityData,
  closeActivity,
}: {
  activityData: IActivity;
  closeActivity?: VoidFunction;
}) {
  return (
    <ViewModel activityData={activityData} closeActivity={closeActivity}>
      <View />
    </ViewModel>
  );
}
