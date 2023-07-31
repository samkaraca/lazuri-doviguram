import { MediaTester } from "@/core/components/media_tester";
import styles from "./theme_side_bar.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DeleteOutline,
  DesignServices,
  WarningAmber,
} from "@mui/icons-material";
import { useAdminViewModelContext } from "../theme_page/view_model/context_providers/admin_view_model";
import { useBaseViewModelContext } from "../theme_page/view_model/context_providers/base_view_model";
import { TextField } from "@mui/material";
import { Testable } from "@/lib/types/testable";

export function ThemeSideBar({
  isOpen,
  setIsOpen,
  hide,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hide: boolean;
}) {
  // context state
  const { title, explanation, image, youtubeVideoUrl } =
    useBaseViewModelContext()!;
  const { saveTheme, deleteTheme } = useAdminViewModelContext()!;

  // component state
  const [modified, setModified] = useState(false);
  const [adminThemeTitle, setAdminThemeTitle] = useState("");
  const [adminThemeExplanation, setAdminThemeExplanation] = useState("");
  const [adminTestfulThemeImage, setAdminTestfulThemeImage] =
    useState<Testable>({
      status: "idle",
      value: "",
    });
  const [
    adminTestfulThemeYoutubeVideoUrl,
    setAdminTestfulThemeYoutubeVideoUrl,
  ] = useState<Testable>({
    status: "idle",
    value: "",
  });

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    setModified(false);
    if (
      title !== adminThemeTitle ||
      explanation !== adminThemeExplanation ||
      adminTestfulThemeImage.status !== "success" ||
      adminTestfulThemeYoutubeVideoUrl.status !== "success" ||
      (adminTestfulThemeImage.status === "success" &&
        adminTestfulThemeImage.value !== image) ||
      (adminTestfulThemeYoutubeVideoUrl.status === "success" &&
        adminTestfulThemeYoutubeVideoUrl.value !== youtubeVideoUrl)
    ) {
      setModified(true);
    }
  });

  const reset = () => {
    setAdminThemeTitle(title);
    setAdminThemeExplanation(explanation);
    setAdminTestfulThemeImage({ status: "success", value: image });
    setAdminTestfulThemeYoutubeVideoUrl({
      status: "success",
      value: youtubeVideoUrl,
    });
  };

  const save = () => {
    saveTheme(
      adminThemeTitle,
      adminThemeExplanation,
      adminTestfulThemeImage.status === "success"
        ? adminTestfulThemeImage.value
        : image,
      adminTestfulThemeYoutubeVideoUrl.status === "success"
        ? adminTestfulThemeYoutubeVideoUrl.value
        : youtubeVideoUrl
    );
  };

  return (
    <>
      <aside className={`${styles["side-bar"]} side-bar`}>
        <div
          style={{ display: isOpen ? undefined : "none" }}
          className={`content`}
        >
          <header>
            <h3>Tema Editörü</h3>
          </header>
          <div className={"main"}>
            {modified && (
              <div className={"warning"}>
                <WarningAmber />
                <div className={"content"}>
                  <span>Kaydedilmemiş değişiklikler var.</span>
                  <div className={"actions"}>
                    <button onClick={reset}>Geri al</button>
                    <button onClick={save}>Kaydet</button>
                  </div>
                </div>
              </div>
            )}
            <div className="input-container">
              <label htmlFor="admin-theme-title-input">Tema Adı</label>
              <TextField
                id="admin-theme-title-input"
                size="small"
                placeholder="Çkuni Ocaği..."
                value={adminThemeTitle}
                onChange={(e) => setAdminThemeTitle(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="admin-theme-explanation-input">
                Tema Açıklaması
              </label>
              <TextField
                id="admin-theme-explanation-input"
                multiline
                size="small"
                minRows={3}
                placeholder="Bu temada aile üyelerinin isimlerini öğreneceğiz..."
                value={adminThemeExplanation}
                onChange={(e) => setAdminThemeExplanation(e.target.value)}
              />
            </div>

            <MediaTester
              label="Tema Fotoğrafı"
              placeholder="meslek.jpg"
              type="image"
              media={adminTestfulThemeImage}
              setMedia={setAdminTestfulThemeImage}
            />

            <MediaTester
              label="Tema YouTube Video Linki"
              placeholder="https://www.youtube.com/watch?v=VQGLYY1Q8yA"
              media={adminTestfulThemeYoutubeVideoUrl}
              type="youtube-video"
              setMedia={setAdminTestfulThemeYoutubeVideoUrl}
            />
          </div>
          <footer>
            <div>
              <button onClick={deleteTheme} className="simple error">
                <span>Temayı sil</span>
                <DeleteOutline />
              </button>
            </div>
          </footer>
        </div>
        <button
          style={{ transform: hide ? "translate(-100%, 0)" : undefined }}
          onClick={() => setIsOpen((prev) => !prev)}
          className={"open-close"}
        >
          <span>Tema</span>
          <DesignServices />
        </button>
      </aside>
    </>
  );
}
