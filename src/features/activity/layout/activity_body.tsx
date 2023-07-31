import { ReactNode } from "react";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import styles from "./styles.module.scss";
import { Activity } from "@/lib/activity/activity";

export function ActivityBody({
  title,
  textContent,
  explanation,
  audio,
  image,
  youtubeVideoUrl,
}: {
  title: Activity["title"];
  textContent: Activity["textContent"];
  explanation: Activity["explanation"];
  audio: Activity["audio"];
  image: Activity["image"];
  youtubeVideoUrl: Activity["youtubeVideoUrl"];
}) {
  return (
    <section className={styles["container"]} aria-label="aktivite">
      <header className={styles["header"]}>
        <h2 className={styles["title"]}>{title}</h2>
      </header>
      <div className={styles["main"]}>
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
        {explanation && (
          <div className={styles["explanation"]}>
            <h3 className={styles["text"]}>{explanation}</h3>
            <div className={styles["line"]} />
          </div>
        )}
        <div className={styles["content"]}>
          {image && (
            <img
              className={styles["image"]}
              alt="Aktivite ek fotoğraf"
              src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${image}`}
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
              src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_AUDIO_BASE_URL}/${audio}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
