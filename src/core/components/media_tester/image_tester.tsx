import { OptionalStringValueProperty } from "@/features/activity_editor/model/view_model";
import { Dispatch, SetStateAction } from "react";
import styles from "./media_tester.module.scss";
import { Image } from "@mui/icons-material";

export function ImageTester({
  media,
  setMedia,
}: {
  media: OptionalStringValueProperty;
  setMedia: Dispatch<SetStateAction<OptionalStringValueProperty>>;
}) {
  return (
    <div>
      {media.status !== "success" && (
        <div className={`${styles["placeholder"]}`}>
          <Image />
          <p>Fotoğraf</p>
        </div>
      )}
      {(media.status === "loading" || media.status === "success") && (
        <img
          height={media.status === "success" ? "auto" : "0"}
          style={{ display: "block" }}
          width="100%"
          onError={() => setMedia((prev) => ({ ...prev, status: "error" }))}
          onLoad={() => setMedia((prev) => ({ ...prev, status: "success" }))}
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${media.value}`}
        />
      )}
    </div>
  );
}
