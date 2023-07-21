import { Activity, LessonMap } from "@/core/models/entities/learning_unit";
import { ActivityRepositoryImplementation } from "@/core/models/repositories/activity_repository_implementation";
import { StatusResponse } from "@/core/models/repositories/status_response";
import { ActivityEditor } from "@/features/activity_editor";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

export default function ActivityEditorPage({
  themeId,
  lessonId,
  activityId,
}: {
  themeId: string;
  lessonId: string;
  activityId: string;
}) {
  const [activityData, setActivityData] = useState<Activity<any>>();

  const fetchActivity = async () => {
    const resObj = await fetch(
      `/api/admin/temalar/${themeId}/${lessonId}/${activityId}`
    );
    const res = (await resObj.json()) as StatusResponse;

    if (res.status === "success") {
      setActivityData(Activity.from(res.data.activity));
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [themeId, lessonId, activityId]);

  if (activityData)
    return <ActivityEditor beginningActivityData={activityData} />;

  return (
    <div className="admin-waiting-room">
      <h1>Merhaba Admin!</h1>
      <p>Aktivite Yükleniyor...</p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { theme, lesson, activity } = context.params as unknown as {
    theme: string;
    lesson: string;
    activity: string;
  };

  return {
    props: {
      themeId: theme,
      lessonId: lesson,
      activityId: activity,
    },
  };
}
