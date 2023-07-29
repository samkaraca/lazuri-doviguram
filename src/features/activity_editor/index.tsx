import { Activity } from "@/lib/activity/activity";
import View from "./view";
import { ViewModel } from "./view_model";

export function ActivityEditor({
  beginningActivityData,
}: {
  beginningActivityData: Activity;
}) {
  return (
    <ViewModel beginningActivityData={beginningActivityData}>
      <View />
    </ViewModel>
  );
}
