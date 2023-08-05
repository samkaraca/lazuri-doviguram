import IActivity from "@/lib/activity/activity";
import View from "./view";
import { ViewModel } from "./view_model";

export function ActivityEditor({
  themeId,
  lessonId,
  activityData,
}: {
  themeId: string;
  lessonId: string;
  activityData: IActivity;
}) {
  return (
    <ViewModel
      themeId={themeId}
      lessonId={lessonId}
      activityData={activityData}
    >
      <View />
    </ViewModel>
  );
}
