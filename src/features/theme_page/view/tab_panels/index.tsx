import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import styles from "./styles.module.scss";
import {
  Inbox,
  RadioButtonUnchecked,
  TaskAltRounded,
} from "@mui/icons-material";
import { BaseViewModel } from "../../model/base_view_model";
import { Activity } from "@/lib/activity/activity";

export function TabPanels() {
  const { lessons, activeLesson, openActivity } = useBaseViewModelContext()!;

  return (
    <div className={styles["tab-panels"]}>
      <div>
        {lessons.map(({ id, title, explanation, activities }, i) => {
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
  activities: Activity[];
  openActivity: BaseViewModel["openActivity"];
}) {
  return (
    <section className={styles["activities"]} aria-label="aktiviteler">
      {activities.length === 0 ? (
        <div className={styles["no-activity"]}>
          <Inbox fontSize="large" />
          <p>Bu derste henüz aktivite yok</p>
        </div>
      ) : (
        <ol className={styles["activity-list"]}>
          {activities.map(({ id, title }, i) => {
            const localData: any = null;
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
                    onClick={() => openActivity(id, activities[i])}
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
