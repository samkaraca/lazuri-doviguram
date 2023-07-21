import { OptionalStringValueProperty } from "@/features/activity_editor/model/view_model";
import getYouTubeID from "get-youtube-id";
import { Dispatch, SetStateAction } from "react";
import YouTube from "react-youtube";
import { YouTube as YouTubeIcon } from "@mui/icons-material";
import styles from "./media_tester.module.scss";

export function YouTubeVideoUrlTester({
  media,
  setMedia,
}: {
  media: OptionalStringValueProperty;
  setMedia: Dispatch<SetStateAction<OptionalStringValueProperty>>;
}) {
  console.log(media);
  return (
    <div>
      {media.status !== "success" && (
        <div className={`${styles["placeholder"]}`}>
          <YouTubeIcon />
          YouTube Video
        </div>
      )}
      {media.status === "loading" && (
        <YouTube
          iframeClassName={styles["zero-size-youtube-iframe"]}
          videoId={getYouTubeID(media.value) ?? undefined}
          style={{
            boxSizing: "border-box",
            maxHeight: 0,
            maxWidth: 0,
            visibility: "hidden",
          }}
          opts={{
            height: 0,
            width: 0,
          }}
          onError={() => setMedia((prev) => ({ ...prev, status: "error" }))}
          onReady={(r) =>
            r.target.videoTitle
              ? setMedia((prev) => ({ ...prev, status: "success" }))
              : setMedia((prev) => ({ ...prev, status: "error" }))
          }
        />
      )}
      {media.status === "success" && (
        <YouTube
          videoId={getYouTubeID(media.value) ?? undefined}
          opts={{
            width: "100%",
            playerVars: {
              rel: 0,
              modestbranding: 1,
            },
          }}
        />
      )}
    </div>
  );
}
