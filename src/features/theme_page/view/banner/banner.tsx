import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import styles from "./banner.module.scss";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../../model/base_view_model";

export function Banner() {
  const { title, explanation, image, youtubeVideoUrl } =
    useBaseViewModelContext() as BaseViewModel;

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
          <h5>4 ders • 16 aktivite</h5>
          <YouTube
            iframeClassName={styles["iframe"]}
            className={styles["youtube"]}
            videoId={getYouTubeID(youtubeVideoUrl) ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
