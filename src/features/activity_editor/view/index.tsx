import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import EditorForm from "./editor_form";
import { Activity } from "@/features/activity";
import useViewModelContext from "../view_model";
import { useMemo } from "react";
import { Activity as IActivity } from "@/core/models/entities/learning_unit";
import {
  FillInBlanksQuestion,
  TrueFalseQuestion,
} from "@/core/models/entities/question";
import { ExerciseConverter } from "../services/exercise_converter";

export default function View() {
  const {
    audio,
    image,
    youtubeVideoUrl,
    title,
    explanation,
    textContent,
    activityType,
    trueFalseExercise,
    multipleChoiceExercise,
    fillInBlanksExercise,
    simpleExercise,
    saveActivity,
  } = useViewModelContext()!;

  const activity: IActivity<any> = useMemo(() => {
    const activityModifier = new ExerciseConverter().fromMap({
      activityType,
      fillInBlanksExercise,
      multipleChoiceExercise,
      simpleExercise,
      trueFalseExercise,
    });
    let activityToReturn: IActivity<any> = {
      activityType: "drag-into-blanks",
      questions: [] as FillInBlanksQuestion[],
      title,
      explanation,
      textContent,
      audio: audio.status === "success" ? audio.value : null,
      image: image.status === "success" ? image.value : null,
      youtubeVideoUrl:
        youtubeVideoUrl.status === "success" ? youtubeVideoUrl.value : null,
    };

    return { ...activityToReturn, ...activityModifier };
  }, [
    activityType,
    audio,
    explanation,
    fillInBlanksExercise,
    image,
    multipleChoiceExercise,
    simpleExercise,
    textContent,
    title,
    trueFalseExercise,
    youtubeVideoUrl,
  ]);

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
          <Activity activity={activity} />
        </div>
      </div>
    </div>
  );
}
