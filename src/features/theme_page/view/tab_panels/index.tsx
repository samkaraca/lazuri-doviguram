import { Activity, ActivityMap } from "@/core/models/entities/learning_unit";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import styles from "./styles.module.scss";
import { Inbox } from "@mui/icons-material";

export function TabPanels() {
  const { lessons, activeLesson, openActivity } = useBaseViewModelContext()!;

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
  activities,
  openActivity,
}: {
  activities: ActivityMap;
  openActivity: (activity: Activity<any>) => void;
}) {
  if (activities["idOrderMeta"].length === 0) {
    return (
      <div className={styles["no-activity-container"]}>
        <Inbox fontSize="large" />
        <p>Bu derste henüz bir aktivite yok</p>
      </div>
    );
  }

  return (
    <div className={styles["activities-container"]}>
      {activities["idOrderMeta"].map((id) => {
        const { title } = activities[id];

        return (
          <div key={id} className={styles["activity-card"]}>
            <h3>{title}</h3>
            <div className={styles["actions"]}>
              <button
                className={`simple ${styles["start"]}`}
                onClick={() => openActivity(activities[id])}
              >
                Başla
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
