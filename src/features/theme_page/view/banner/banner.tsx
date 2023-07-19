import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import { OptionButton } from "@/core/components/option_button";
import styles from "./banner.module.scss";
import { Edit, YouTube as YouTubeIcon } from "@mui/icons-material";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../../model/base_view_model";
import { useAdminViewModelContext } from "../../view_model/context_providers/admin_view_model";

export function Banner() {
  const {
    themeTitle,
    themeExplanation,
    themeYoutubeVideoUrl,
    themeImage,
    isAdmin,
  } = useBaseViewModelContext() as BaseViewModel;
  const { adminThemeDialog } = useAdminViewModelContext()!;
  const {
    activateThemeExplanationDialog,
    activateThemeTitleDialog,
    activateThemeYouTubeVideoUrlDialog,
  } = adminThemeDialog;

  return (
    <div className={styles["banner"]}>
      <div className={styles["banner-inner-container"]}>
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${themeImage}`}
          alt="tema fotoğrafı"
        />
        <div className={`${styles["content"]}`}>
          <OptionButton
            existent={isAdmin}
            icon={<Edit />}
            onClick={activateThemeTitleDialog}
          >
            <h1>{themeTitle}</h1>
          </OptionButton>
          <OptionButton
            existent={isAdmin}
            icon={<Edit />}
            onClick={activateThemeExplanationDialog}
          >
            <h3>{themeExplanation}</h3>
          </OptionButton>
          <h5>4 ders • 16 aktivite</h5>
          <OptionButton
            existent={isAdmin}
            left={false}
            icon={<YouTubeIcon />}
            onClick={activateThemeYouTubeVideoUrlDialog}
          >
            <YouTube
              iframeClassName={styles["iframe"]}
              className={styles["youtube"]}
              videoId={getYouTubeID(themeYoutubeVideoUrl) ?? undefined}
            />
          </OptionButton>
        </div>
      </div>
    </div>
  );
}
