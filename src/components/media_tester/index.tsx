import { Dispatch, SetStateAction } from "react";
import styles from "./media_tester.module.scss";
import { OptionalStringValueProperty } from "@/features/activity_editor/model/view_model";
import { ImageTester } from "./image_tester";
import { YouTubeVideoUrlTester } from "./youtube_video_url_tester";

export function MediaTester({
  label,
  placeholder,
  media,
  setMedia,
  type = "none",
}: {
  label: string;
  placeholder: string;
  media: OptionalStringValueProperty;
  setMedia: Dispatch<SetStateAction<OptionalStringValueProperty>>;
  type?: "youtube-video" | "image" | "none";
}) {
  const { status } = media;

  return (
    <div>
      <div className={`input-container ${styles["container"]}`}>
        <label htmlFor="foto">{label}</label>
        {type === "youtube-video" ? (
          <YouTubeVideoUrlTester media={media} setMedia={setMedia} />
        ) : (
          type === "image" && <ImageTester media={media} setMedia={setMedia} />
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMedia((prev) => ({ ...prev, status: "loading" }));
          }}
        >
          <input
            required
            className={`simple ${
              status === "error"
                ? "error"
                : status === "success"
                ? "success"
                : undefined
            }`}
            id="foto"
            type="text"
            placeholder={placeholder}
            value={media.value}
            onChange={(e) =>
              setMedia({ status: "idle", value: e.target.value })
            }
          />
          <button
            className={`simple basic ${
              status === "error"
                ? "error"
                : status === "success"
                ? "success"
                : undefined
            }`}
            disabled={status !== "idle"}
          >
            Test
          </button>
        </form>
      </div>
    </div>
  );
}
