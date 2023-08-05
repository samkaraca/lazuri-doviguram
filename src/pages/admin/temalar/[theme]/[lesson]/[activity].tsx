import { ActivityEditor } from "@/features/activity_editor";
import IActivity from "@/lib/activity/activity";
import ActivityAdminService from "@/lib/services/activity/activity_admin_service";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ActivityEditorPage() {
  const pathname = usePathname();
  const adminService = useRef(new ActivityAdminService());
  const [pathnames, setPathnames] = useState<[string, string, string]>();
  const [activityData, setActivityData] = useState<IActivity>();

  const fetchActivity = async (
    themeId: string,
    lessonId: string,
    activityId: string
  ) => {
    setActivityData(
      await adminService.current.fetchActivity(themeId, lessonId, activityId)
    );
  };

  useEffect(() => {
    if (!pathname) return;
    const splitPathname = pathname.split("/");
    const themeId = splitPathname[splitPathname.length - 3];
    const lessonId = splitPathname[splitPathname.length - 2];
    const activityId = splitPathname[splitPathname.length - 1];
    setPathnames([themeId, lessonId, activityId]);
    fetchActivity(themeId, lessonId, activityId);
  }, [pathname]);

  if (activityData && pathnames) {
    return (
      <ActivityEditor
        themeId={pathnames[0]}
        lessonId={pathnames[1]}
        activityData={activityData}
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
