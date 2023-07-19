import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import useViewModelContext from "@/features/activity_editor/view_model";
import { OptionalStringValueProperty } from "@/features/activity_editor/model/view_model";

export function MediaTester({
  label,
  placeholder,
  media,
  setMedia,
}: {
  label: string;
  placeholder: string;
  media: OptionalStringValueProperty;
  setMedia: Dispatch<SetStateAction<OptionalStringValueProperty>>;
}) {
  const { status } = media;

  return (
    <div className={`input-container ${styles["container"]}`}>
      <label htmlFor="foto">{label}</label>
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
          onChange={(e) => setMedia({ status: "idle", value: e.target.value })}
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
  );
}
