import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./styles.module.scss";
import useViewModelContext from "../view_model";
import { MediaTester } from "@/core/components/media_tester";
import YouTube from "react-youtube";
import { NextImageContainer } from "@/core/components/next_image_container";
import getYouTubeID from "get-youtube-id";
import ExerciseEditor from "./exercise_editor";
import { Activity } from "@/lib/activity/activity";

const activityTypeMap = {
  "true-false": "Doğru yanlış",
  "type-in-blanks": "Boşluk doldurma",
  "drag-into-blanks": "Boşluğa sürükleme",
  "multiple-choice": "Çoktan seçmeli",
  "pair-texts-with-images": "Resimle eşleştirme",
};

export default function EditorForm() {
  const {
    title,
    setTitle,
    explanation,
    setExplanation,
    textContent,
    setTextContent,
    youtubeVideoUrl,
    setYoutubeVideoUrl,
    audio,
    setAudio,
    image,
    setImage,
    type,
    changeActivityType,
  } = useViewModelContext()!;

  return (
    <div
      className={`${styles["simple-container"]} ${styles["editing-form-container"]}`}
    >
      <FormControl>
        <InputLabel id="activity-type-select-label">Aktivite türü</InputLabel>
        <Select
          value={type}
          onChange={(e) =>
            changeActivityType(e.target.value as Activity["type"])
          }
          label="Aktivite türü"
          labelId="activity-type-select-label"
        >
          {Object.keys(activityTypeMap).map((code) => {
            return (
              <MenuItem key={code} value={code}>
                {activityTypeMap[code as keyof typeof activityTypeMap]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className="input-container" aria-label="başlık">
        <label htmlFor="editor-form-activity-title">Başlık</label>
        <input
          className="simple"
          type="text"
          id="editor-form-activity-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-container" aria-label="açıklama">
        <label htmlFor="editor-form-activity-explanation">Açıklama</label>
        <input
          className="simple"
          type="text"
          id="editor-form-activity-explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>
      <section aria-label="youtube video linki">
        {(youtubeVideoUrl.status === "loading" ||
          youtubeVideoUrl.status === "success") && (
          <YouTube
            style={{
              visibility: "hidden",
              position: "absolute",
              top: "999vh",
              left: "999vw",
            }}
            videoId={
              getYouTubeID(youtubeVideoUrl.value) ??
              (() => {
                setYoutubeVideoUrl((prev) => ({ ...prev, status: "error" }));
                return undefined;
              })()
            }
            onError={() =>
              setYoutubeVideoUrl((prev) => ({ ...prev, status: "error" }))
            }
            onReady={(r) =>
              r.target.videoTitle
                ? setYoutubeVideoUrl((prev) => ({ ...prev, status: "success" }))
                : setYoutubeVideoUrl((prev) => ({ ...prev, status: "error" }))
            }
          />
        )}
        <MediaTester
          label="Youtube Video URL"
          placeholder="https://youtu.be/5UdYesdXFco"
          media={youtubeVideoUrl}
          setMedia={setYoutubeVideoUrl}
        />
      </section>
      <section aria-label="fotoğraf ismi">
        {(image.status === "loading" || image.status === "success") && (
          <NextImageContainer
            style={{ height: 0 }}
            src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${image.value}`}
            alt="fotoğraf ismi"
            onError={() => setImage((prev) => ({ ...prev, status: "error" }))}
            onLoad={() => setImage((prev) => ({ ...prev, status: "success" }))}
          />
        )}
        <MediaTester
          label="Foto"
          placeholder="foto.jpg"
          media={image}
          setMedia={setImage}
        />
      </section>
      <div className="input-container" aria-label="başlık">
        <label htmlFor="editor-form-activity-content">İçerik</label>
        <textarea
          className="simple"
          id="editor-form-activity-content"
          value={textContent}
          rows={5}
          onChange={(e) => setTextContent(e.target.value)}
        />
      </div>
      <section aria-label="ses dosyası ismi">
        {(audio.status === "loading" || audio.status === "success") && (
          <audio
            src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_AUDIO_BASE_URL}/${audio.value}`}
            onError={() => setAudio((prev) => ({ ...prev, status: "error" }))}
            onCanPlayThrough={() =>
              setAudio((prev) => ({ ...prev, status: "success" }))
            }
          />
        )}
        <MediaTester
          setMedia={setAudio}
          media={audio}
          label="Ses"
          placeholder="ses.mp3"
        />
      </section>
      <ExerciseEditor />
    </div>
  );
}
