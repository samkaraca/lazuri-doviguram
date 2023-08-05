import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import EditorForm from "./editor_form";
import useViewModelContext from "../view_model";
import { Activity } from "@/features/activity";

export default function View() {
  const {
    id,
    audio,
    image,
    youtubeVideoUrl,
    title,
    explanation,
    textContent,
    type,
    exercise,
    savedAt,
    saveActivity,
  } = useViewModelContext()!;

  return (
    <div className={styles["main"]}>
      <AppBar className={styles["appbar"]}>
        <Toolbar sx={{ color: "white" }}>
          <Typography flexGrow={1} variant="h5">
            Aktivite Editörü
          </Typography>
          <div className={styles["buttons"]}>
            <Button color="inherit" onClick={saveActivity}>
              Kaydet
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={styles["content"]}>
        <EditorForm />
        <div className={styles["simple-container"]}>
          <Activity
            closeActivity={() => {}}
            activityData={{
              id,
              type,
              title,
              explanation,
              textContent,
              savedAt,
              audio: audio.status === "success" ? audio.value : null,
              image: image.status === "success" ? image.value : null,
              youtubeVideoUrl:
                youtubeVideoUrl.status === "success"
                  ? youtubeVideoUrl.value
                  : null,
              exercise,
            }}
          />
        </div>
      </div>
    </div>
  );
}
