import { ActivityEditor } from "@/features/activity_editor";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useAdminActivity } from "@/api/activity/useAdminActivity";

export default function ActivityEditorPage() {
  const { query } = useRouter();
  const [themeId, lessonId, activityId] = useMemo(() => {
    return [query.theme as string, query.lesson as string, query.activity as string];
  }, [query]);
  const { data: activityData } = useAdminActivity({ themeId, lessonId, activityId });

  if (activityData?.data && themeId && lessonId && activityId) {
    return (
      <ActivityEditor
        themeId={themeId}
        lessonId={lessonId}
        activityData={activityData.data}
      />
    );
  }

  return (
    <div className="admin-waiting-room">
      <h1>Merhaba Admin!</h1>
      <p>Aktivite Yükleniyor...</p>
    </div>
  );
}
