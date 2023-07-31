import { Dialog } from "@mui/material";
import { YouTube as YouTubeIcon } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import styles from "./styles.module.scss";
import { poppins } from "@/pages/_app";
import { Testable } from "@/lib/types/testable";

export interface IDialog {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<IDialog["isOpen"]>>;
  title: string;
  placeholder: string;
  saveContent: () => void;
}

export interface ISimpleDialog extends IDialog {
  type: "text";
  content: string;
  setContent: Dispatch<SetStateAction<ISimpleDialog["content"]>>;
}

export interface ITestfulDialog extends IDialog {
  type: "image" | "youtube-video" | "audio";
  content: Testable;
  setContent: Dispatch<SetStateAction<ITestfulDialog["content"]>>;
}

export function AltEditDialog(dialog: ISimpleDialog | ITestfulDialog) {
  const {
    isOpen,
    setIsOpen,
    title,
    placeholder,
    content,
    setContent,
    type,
    saveContent,
  } = dialog;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [isOpen]);

  return (
    <Dialog
      style={poppins.style}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
    >
      <form
        className={styles["dialog-content"]}
        onSubmit={(e) => e.preventDefault()}
      >
        <h3>{title}</h3>
        <section aria-label="diyalog içeriği">
          {type === "image" ? (
            <ImageTester image={content} setImage={setContent} />
          ) : type === "youtube-video" ? (
            <YouTubeVideoTester videoLink={content} setVideoLink={setContent} />
          ) : (
            type === "audio" && (
              <AudioTester audio={content} setAudio={setContent} />
            )
          )}
          <input
            type="text"
            ref={inputRef}
            className={`simple ${
              type !== "text" &&
              (content.status === "error"
                ? "error"
                : content.status === "success"
                ? "success"
                : undefined)
            }`}
            value={type === "text" ? content : content.value}
            placeholder={placeholder}
            onChange={(e) =>
              type === "text"
                ? setContent(e.target.value)
                : setContent((prev) => ({
                    status: "idle",
                    value: e.target.value,
                  }))
            }
          />
        </section>
        <section aria-label="diyalog butonları">
          {type !== "text" && (
            <button
              type={content.status === "idle" ? "submit" : "button"}
              disabled={content.status !== "idle"}
              className={`simple basic`}
              onClick={() =>
                setContent((prev) => ({ ...prev, status: "loading" }))
              }
            >
              Test
            </button>
          )}
          <button
            type={
              type === "text" || content.status === "success"
                ? "submit"
                : "button"
            }
            disabled={type !== "text" && content.status !== "success"}
            className={`simple basic`}
            onClick={saveContent}
          >
            Kaydet
          </button>
        </section>
      </form>
    </Dialog>
  );
}

function ImageTester({
  image,
  setImage,
}: {
  image: Testable;
  setImage: Dispatch<SetStateAction<Testable>>;
}) {
  return (
    <div>
      {(image.status === "loading" || image.status === "success") && (
        <img
          height={image.status === "success" ? "auto" : "0"}
          style={{ display: "block" }}
          width="100%"
          onError={() => setImage((prev) => ({ ...prev, status: "error" }))}
          onLoad={() => setImage((prev) => ({ ...prev, status: "success" }))}
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${image.value}`}
        />
      )}

      {image.status !== "success" && (
        <div className={`${styles["placeholder"]}`}>Foto</div>
      )}
    </div>
  );
}

function YouTubeVideoTester({
  videoLink,
  setVideoLink,
}: {
  videoLink: Testable;
  setVideoLink: Dispatch<SetStateAction<Testable>>;
}) {
  return (
    <div>
      {videoLink.status === "loading" && (
        <YouTube
          videoId={getYouTubeID(videoLink.value) ?? undefined}
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
          onError={() => setVideoLink((prev) => ({ ...prev, status: "error" }))}
          onReady={(r) =>
            r.target.videoTitle
              ? setVideoLink((prev) => ({ ...prev, status: "success" }))
              : setVideoLink((prev) => ({ ...prev, status: "error" }))
          }
        />
      )}
      {videoLink.status === "success" && (
        <YouTube
          videoId={getYouTubeID(videoLink.value) ?? undefined}
          opts={{
            width: "100%",
            playerVars: {
              rel: 0,
              modestbranding: 1,
            },
          }}
        />
      )}

      {videoLink.status !== "success" && (
        <div className={`${styles["placeholder"]}`}>
          <YouTubeIcon className={styles["icon"]} />
          YouTube video
        </div>
      )}
    </div>
  );
}

function AudioTester({
  audio,
  setAudio,
}: {
  audio: Testable;
  setAudio: Dispatch<SetStateAction<Testable>>;
}) {
  return (
    <div>
      {(audio.status === "loading" || audio.status === "success") && (
        <audio
          controls={audio.status === "success"}
          style={{ display: "block" }}
          onError={() => setAudio((prev) => ({ ...prev, status: "error" }))}
          onCanPlayThrough={() =>
            setAudio((prev) => ({ ...prev, status: "success" }))
          }
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_AUDIO_BASE_URL}/${audio.value}`}
        />
      )}

      {audio.status !== "success" && <div>Ses</div>}
    </div>
  );
}
