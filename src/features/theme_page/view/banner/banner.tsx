import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import styles from "./banner.module.scss";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../../model/base_view_model";
import { useEffect, useState } from "react";

export function Banner() {
  const [lessonCount, setLessonCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const { title, explanation, image, youtubeVideoUrl, lessons } =
    useBaseViewModelContext() as BaseViewModel;

  useEffect(() => {
    const lessonCount = lessons.length;
    const activityCount = lessons.reduce((acc, lesson) => {
      return acc + lesson.activities.length;
    }, 0);
    setLessonCount(lessonCount);
    setActivityCount(activityCount);
  }, [lessons]);

  return (
    <div className={styles["banner"]}>
      <div className={styles["banner-inner-container"]}>
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${image}`}
          alt="tema fotoğrafı"
        />
        <div className={`${styles["content"]}`}>
          <h1>{title}</h1>
          <h3>{explanation}</h3>
          <h5>
            {lessonCount} ders • {activityCount} aktivite
          </h5>
          {youtubeVideoUrl && (
            <YouTube
              iframeClassName={styles["iframe"]}
              className={styles["youtube"]}
              videoId={getYouTubeID(youtubeVideoUrl) ?? undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
