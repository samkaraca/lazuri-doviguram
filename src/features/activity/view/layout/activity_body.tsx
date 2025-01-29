import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import styles from "./styles.module.scss";
import useViewModelContext from "../../view_model";

export function ActivityBody() {
  const { activityData } = useViewModelContext()!;
  const { title, youtubeVideoUrl, explanation, image, textContent, audio } =
    activityData;

  return (
    <>
      <header className={styles["header"]}>
        <h2 className={styles["title"] + " font-bold text-4xl"}>{title}</h2>
      </header>
      {explanation && (
        <div className={styles["explanation"]}>
          <h3 className={styles["text"] + " font-bold text-[1.7rem]"}>{explanation}</h3>
          <div className={styles["line"]} />
        </div>
      )}
      {youtubeVideoUrl && (
        <div className={styles["yt-container-container"]}>
          <YouTube
            iframeClassName={styles["yt-iframe"]}
            className={styles["yt-container"]}
            opts={{ width: "100%", height: "100%" }}
            videoId={getYouTubeID(youtubeVideoUrl) ?? undefined}
          />
        </div>
      )}
      <div className={styles["content"]}>
        {image && (
          <img
            className={styles["image"]}
            alt="Aktivite ek fotoğraf"
            src={`${image}`}
          />
        )}
        {textContent && (
          <p
            className={styles["text-content"]}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )}
        {audio && (
          <audio
            className={styles["audio"]}
            controls
            src={`${audio}`}
          />
        )}
      </div>
    </>
  );
}
