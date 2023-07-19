import {
  AltEditDialog,
  ISimpleDialog,
  ITestfulDialog,
} from "@/features/edit_dialog/index.alt";
import { AdminViewModel } from "../model/admin_view_model";
import { BaseViewModel } from "../model/base_view_model";
import { ReactNode, useMemo, useState } from "react";

export interface IAdminThemeDialog {
  activateThemeTitleDialog: VoidFunction;
  activateThemeExplanationDialog: VoidFunction;
  activateThemeImageDialog: VoidFunction;
  activateThemeYouTubeVideoUrlDialog: VoidFunction;
  activateLessonTitleDialog: (lessonIndex: number) => void;
  activateLessonExplanationDialog: (lessonId: string) => void;
  dialogElement: ReactNode;
}

export function useAdminThemeDialog({
  themeTitle,
  saveThemeTitle,
  themeExplanation,
  saveThemeExplanation,
  themeYoutubeVideoUrl,
  saveThemeYoutubeVideoUrl,
  themeImage,
  saveThemeImage,
  saveLessonTitle,
  saveLessonExplanation,
  lessons,
}: Pick<
  AdminViewModel & BaseViewModel,
  | "themeTitle"
  | "saveThemeTitle"
  | "themeExplanation"
  | "saveThemeExplanation"
  | "themeYoutubeVideoUrl"
  | "saveThemeYoutubeVideoUrl"
  | "themeImage"
  | "saveThemeImage"
  | "saveLessonTitle"
  | "saveLessonExplanation"
  | "lessons"
>): IAdminThemeDialog {
  const [dialogPurpose, setDialogPurpose] = useState<
    | "saveThemeTitle"
    | "saveThemeExplanation"
    | "saveThemeYoutubeVideoUrl"
    | "saveThemeImage"
    | "saveLessonTitle"
    | "saveLessonExplanation"
  >("saveThemeTitle");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogPlaceholder, setDialogPlaceholder] = useState("");
  const [simpleDialogContent, setSimpleDialogContent] =
    useState<ISimpleDialog["content"]>("");
  const [testfulDialogContent, setTestfulDialogContent] = useState<
    ITestfulDialog["content"]
  >({ status: "idle", value: "" });
  const [dialogType, setDialogType] = useState<
    ISimpleDialog["type"] | ITestfulDialog["type"]
  >("text");

  let saveContentFunction: VoidFunction = useMemo(() => {
    return () => {
      if (dialogPurpose === "saveThemeTitle") {
        saveThemeTitle(simpleDialogContent);
      } else if (dialogPurpose === "saveThemeExplanation") {
        saveThemeExplanation(simpleDialogContent);
      } else if (dialogPurpose === "saveThemeYoutubeVideoUrl") {
        saveThemeYoutubeVideoUrl(testfulDialogContent.value);
      } else if (dialogPurpose === "saveThemeImage") {
        saveThemeImage(testfulDialogContent.value);
      } else if (dialogPurpose === "saveLessonTitle") {
        saveLessonTitle(simpleDialogContent);
      } else if (dialogPurpose === "saveLessonExplanation") {
        saveLessonExplanation(simpleDialogContent);
      }

      setIsDialogOpen(false);
    };
  }, [dialogPurpose, simpleDialogContent, testfulDialogContent]);

  const activateThemeTitleDialog = () => {
    setDialogPurpose("saveThemeTitle");
    setDialogType("text");
    setDialogTitle("Tema Başlığı");
    setDialogPlaceholder("Ailemiz...");
    setSimpleDialogContent(themeTitle);
    setIsDialogOpen(true);
  };

  const activateThemeExplanationDialog = () => {
    setDialogPurpose("saveThemeExplanation");
    setDialogType("text");
    setDialogTitle("Tema Açıklaması");
    setDialogPlaceholder("Bu temada ailemizi tanıyacağız...");
    setSimpleDialogContent(themeExplanation);
    setIsDialogOpen(true);
  };

  const activateThemeYouTubeVideoUrlDialog = () => {
    setDialogPurpose("saveThemeYoutubeVideoUrl");
    setDialogType("youtube-video");
    setDialogTitle("Tema YouTube Videosu");
    setDialogPlaceholder("https://www.youtube.com/watch?v=jzUHgC7Tylk");
    setTestfulDialogContent({ value: themeYoutubeVideoUrl, status: "success" });
    setIsDialogOpen(true);
  };

  const activateThemeImageDialog = () => {
    setDialogPurpose("saveThemeImage");
    setDialogType("image");
    setDialogTitle("Tema Fotoğrafı");
    setDialogPlaceholder("foto.jpg");
    setTestfulDialogContent({ value: themeImage, status: "success" });
    setIsDialogOpen(true);
  };

  const activateLessonTitleDialog = (lessonIndex: number) => {
    setDialogPurpose("saveLessonTitle");
    setDialogType("text");
    setDialogTitle("Ders Başlığı");
    setDialogPlaceholder("Aile Bireyleri...");
    setSimpleDialogContent(lessons.meta[lessonIndex].title);
    setIsDialogOpen(true);
  };

  const activateLessonExplanationDialog = (lessonId: string) => {
    setDialogPurpose("saveLessonExplanation");
    setDialogType("text");
    setDialogTitle("Ders Açıklaması");
    setDialogPlaceholder("Bu derste...");
    setSimpleDialogContent(lessons[lessonId].explanation);
    setIsDialogOpen(true);
  };

  const dialogElement = (
    <AltEditDialog
      isOpen={isDialogOpen}
      setIsOpen={setIsDialogOpen}
      {...(dialogType === "text"
        ? {
            type: dialogType,
            content: simpleDialogContent,
            setContent: setSimpleDialogContent,
          }
        : {
            type: dialogType,
            content: testfulDialogContent,
            setContent: setTestfulDialogContent,
          })}
      placeholder={dialogPlaceholder}
      title={dialogTitle}
      saveContent={saveContentFunction}
    />
  );

  return {
    activateThemeTitleDialog,
    activateThemeExplanationDialog,
    activateThemeImageDialog,
    activateThemeYouTubeVideoUrlDialog,
    activateLessonTitleDialog,
    activateLessonExplanationDialog,
    dialogElement,
  };
}
