import { Activity } from "@/core/models/entities/learning_unit";
import View from "./view";
import { ViewModel } from "./view_model";

export function ActivityEditor({
  beginningActivityData,
}: {
  beginningActivityData: Activity<any>;
}) {
  return (
    <ViewModel beginningActivityData={beginningActivityData}>
      <View />
    </ViewModel>
  );
}
