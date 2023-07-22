import { MediaTester } from "@/core/components/media_tester";
import styles from "./theme_side_bar.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DeleteOutline,
  DesignServices,
  RssFeed,
  WarningAmber,
} from "@mui/icons-material";
import { useAdminViewModelContext } from "../theme_page/view_model/context_providers/admin_view_model";
import { useBaseViewModelContext } from "../theme_page/view_model/context_providers/base_view_model";
import { Testable } from "@/core/models/entities/testable";
import { TextField } from "@mui/material";

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
  const { themeTitle, themeExplanation, themeImage, themeYoutubeVideoUrl } =
    useBaseViewModelContext()!;
  const { saveTheme, deleteTheme, publishChanges } =
    useAdminViewModelContext()!;

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
      themeTitle !== adminThemeTitle ||
      themeExplanation !== adminThemeExplanation ||
      adminTestfulThemeImage.status !== "success" ||
      adminTestfulThemeYoutubeVideoUrl.status !== "success" ||
      (adminTestfulThemeImage.status === "success" &&
        adminTestfulThemeImage.value !== themeImage) ||
      (adminTestfulThemeYoutubeVideoUrl.status === "success" &&
        adminTestfulThemeYoutubeVideoUrl.value !== themeYoutubeVideoUrl)
    ) {
      setModified(true);
    }
  });

  const reset = () => {
    setAdminThemeTitle(themeTitle);
    setAdminThemeExplanation(themeExplanation);
    setAdminTestfulThemeImage({ status: "success", value: themeImage });
    setAdminTestfulThemeYoutubeVideoUrl({
      status: "success",
      value: themeYoutubeVideoUrl,
    });
  };

  const save = () => {
    saveTheme({
      title: adminThemeTitle,
      explanation: adminThemeExplanation,
      image:
        adminTestfulThemeImage.status === "success"
          ? adminTestfulThemeImage.value
          : themeImage,
      youtubeVideoUrl:
        adminTestfulThemeYoutubeVideoUrl.status === "success"
          ? adminTestfulThemeYoutubeVideoUrl.value
          : themeYoutubeVideoUrl,
    });
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
            <button onClick={publishChanges} className="simple">
              <span>Değişiklikleri Yayınla</span>
              <RssFeed />
            </button>
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
