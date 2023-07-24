import { ActivityMap } from "@/core/models/entities/learning_unit";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import styles from "./styles.module.scss";
import {
  Inbox,
  RadioButtonUnchecked,
  TaskAltRounded,
} from "@mui/icons-material";
import { BaseViewModel } from "../../model/base_view_model";
import { useEffect, useRef, useState } from "react";
import { UserExerciseLocalRepositoryImplementation } from "@/features/activity/services/user_exercise_local_repository_implementation";

export function TabPanels() {
  const { lessons, activeLesson, openActivity, activeActivityId } =
    useBaseViewModelContext()!;

  return (
    <div className={styles["tab-panels"]}>
      <div>
        {lessons.meta.map((lessonMeta, i) => {
          const { id, title } = lessonMeta;
          const { explanation, activities } = lessons[id];

          return (
            activeLesson === i && (
              <div key={id} className={styles["panel"]}>
                <h2>{title}</h2>
                <p style={{ maxWidth: "45em" }}>{explanation}</p>
                <ActivitiesContainer
                  activeActivityId={activeActivityId}
                  openActivity={openActivity}
                  activities={activities}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export function ActivitiesContainer({
  activeActivityId,
  activities,
  openActivity,
}: {
  activeActivityId: string | null;
  activities: ActivityMap;
  openActivity: BaseViewModel["openActivity"];
}) {
  const userExerciseLocalRepository = useRef(
    new UserExerciseLocalRepositoryImplementation()
  );
  const [localActivityData, setLocalActivityDatas] = useState<
    ({ exerciseData: any; grade: string } | null)[]
  >([]);

  useEffect(() => {
    setLocalActivityDatas(
      activities["idOrderMeta"].map((activityId) => {
        return userExerciseLocalRepository.current.getLocalUserActivityData({
          activityId,
        });
      })
    );
  }, [activities, activeActivityId]);

  return (
    <section className={styles["activities"]} aria-label="aktiviteler">
      {activities["idOrderMeta"].length === 0 ? (
        <div className={styles["no-activity"]}>
          <Inbox fontSize="large" />
          <p>Bu derste henüz aktivite yok</p>
        </div>
      ) : (
        <ol className={styles["activity-list"]}>
          {activities["idOrderMeta"].map((id, i) => {
            const { title } = activities[id];
            const localData = localActivityData[i];

            return (
              <li key={id} className={styles["activity-card"]}>
                <div className={styles["left-group"]}>
                  {localData ? <TaskAltRounded /> : <RadioButtonUnchecked />}
                  <h3>{title}</h3>
                </div>
                <div className={styles["right-group"]}>
                  <span>{localData && `%${localData.grade}`}</span>
                  <button
                    className={`simple lg ${styles["start"]}`}
                    onClick={() => openActivity(id, activities[id])}
                  >
                    Başla
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
