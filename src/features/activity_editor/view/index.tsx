import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import EditorForm from "./editor_form";
import { Activity } from "@/features/activity";
import useViewModelContext from "../view_model";
import { Activity as ActivityModel } from "@/lib/activity/activity";
import { useBaseViewModelContext } from "@/features/theme_page/view_model/context_providers/base_view_model";

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
    multipleChoiceExercise,
    fillInBlanksExercise,
    simpleExercise,
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
            activity={ActivityModel.from({
              id,
              type,
              title,
              explanation,
              textContent,
              audio: audio.status === "success" ? audio.value : null,
              image: image.status === "success" ? image.value : null,
              youtubeVideoUrl:
                youtubeVideoUrl.status === "success"
                  ? youtubeVideoUrl.value
                  : null,
              exercise:
                type === "drag-into-blanks" || type === "type-in-blanks"
                  ? fillInBlanksExercise
                  : type === "pair-texts-with-images" || type === "true-false"
                  ? simpleExercise
                  : multipleChoiceExercise,
            })}
          />
        </div>
      </div>
    </div>
  );
}
