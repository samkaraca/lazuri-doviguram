import { Activity, ActivityMap } from "@/core/models/entities/learning_unit";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import styles from "./styles.module.scss";
import {
  Add,
  DeleteForever,
  Inbox,
  DesignServices,
  Edit,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useAdminViewModelContext } from "../../view_model/context_providers/admin_view_model";
import { OptionButton } from "@/core/components/option_button";
import { useRouter } from "next/router";

export function TabPanels() {
  const { lessons, activeLesson, isAdmin, openActivity } =
    useBaseViewModelContext()!;
  const { adminThemeDialog, deleteLesson, createNewActivity } =
    useAdminViewModelContext()!;
  const { activateLessonTitleDialog, activateLessonExplanationDialog } =
    adminThemeDialog;

  return (
    <div className={styles["tab-panels"]}>
      <div>
        {lessons.meta.map((lessonMeta, i) => {
          const { id, title } = lessonMeta;
          const { explanation, activities } = lessons[id];

          return (
            <div
              key={id}
              style={{ display: activeLesson === i ? "block" : "none" }}
              className={styles["panel"]}
            >
              <OptionButton
                icon={<Edit />}
                existent={isAdmin}
                onClick={() => activateLessonTitleDialog(i)}
              >
                <h2>{title}</h2>
              </OptionButton>
              <OptionButton
                icon={<Edit />}
                existent={isAdmin}
                onClick={() => activateLessonExplanationDialog(id)}
              >
                <p style={{ maxWidth: "45em" }}>{explanation}</p>
              </OptionButton>
              <ActivitiesContainer
                openActivity={openActivity}
                isAdmin={isAdmin}
                activities={activities}
                lessonId={id}
              />
              {isAdmin && (
                <>
                  <div className={styles["lesson-actions-container"]}>
                    <hr />
                    <div className={styles["buttons"]}>
                      <Button
                        color="error"
                        variant="contained"
                        endIcon={<DeleteForever />}
                        onClick={() => deleteLesson(id)}
                      >
                        DERSİ SİL
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        endIcon={<Add />}
                        onClick={() => createNewActivity(id)}
                      >
                        YENİ AKTİVİTE OLUŞTUR
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ActivitiesContainer({
  activities,
  lessonId,
  isAdmin,
  openActivity,
}: {
  activities: ActivityMap;
  lessonId: string;
  isAdmin: boolean;
  openActivity: (activity: Activity<any>) => void;
}) {
  const router = useRouter();

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

              {isAdmin && (
                <IconButton
                  onClick={() =>
                    router.push(`${router.asPath}/${lessonId}/${id}`)
                  }
                >
                  <DesignServices />
                </IconButton>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
