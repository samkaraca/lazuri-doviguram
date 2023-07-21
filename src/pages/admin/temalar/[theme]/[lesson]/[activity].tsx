import { Activity } from "@/core/models/entities/learning_unit";
import { StatusResponse } from "@/core/models/repositories/status_response";
import { ActivityEditor } from "@/features/activity_editor";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ActivityEditorPage() {
  const pathname = usePathname();
  const [activityData, setActivityData] = useState<Activity<any>>();

  const fetchActivity = async ({
    themeId,
    lessonId,
    activityId,
  }: {
    themeId: string;
    lessonId: string;
    activityId: string;
  }) => {
    const resObj = await fetch(
      `/api/admin/temalar/${themeId}/${lessonId}/${activityId}`
    );
    const res = (await resObj.json()) as StatusResponse;

    console.log("la", res);
    if (res.status === "success") {
      setActivityData(Activity.from(res.data.activity));
    }
  };

  useEffect(() => {
    if (!pathname) return;
    const splitPathname = pathname.split("/");
    const themeId = splitPathname[splitPathname.length - 3];
    const lessonId = splitPathname[splitPathname.length - 2];
    const activityId = splitPathname[splitPathname.length - 1];
    fetchActivity({ themeId, lessonId, activityId });
  }, [pathname]);

  if (activityData)
    return <ActivityEditor beginningActivityData={activityData} />;

  return (
    <div className="admin-waiting-room">
      <h1>Merhaba Admin!</h1>
      <p>Aktivite Yükleniyor...</p>
    </div>
  );
}
