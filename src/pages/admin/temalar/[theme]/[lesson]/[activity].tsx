import { Activity, LessonMap } from "@/core/models/entities/learning_unit";
import { ActivityRepositoryImplementation } from "@/core/models/repositories/activity_repository_implementation";
import { ActivityEditor } from "@/features/activity_editor";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { GetServerSidePropsContext } from "next";

export default function ActivityEditorPage({
  activityDBData,
}: {
  activityDBData: Activity<any>;
}) {
  return (
    <ActivityEditor beginningActivityData={Activity.from(activityDBData)} />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { theme, lesson, activity } = context.params as unknown as {
    theme: string;
    lesson: string;
    activity: string;
  };
  const activityRepo = new ActivityRepositoryImplementation();

  const rawData = await activityRepo.getActivity(theme);
  const data = unmarshall(rawData) as { lessons: LessonMap };
  const requestedLesson = data.lessons;
  const requestedActivity = requestedLesson[lesson].activities[activity];

  return {
    props: {
      activityDBData: requestedActivity,
    },
  };
}
