import { IAdminThemeDialog } from "../view_model/use_admin_theme_dialog";

export interface AdminViewModel {
  isAdmin: boolean;
  saveThemeTitle: (newTitle: string) => void;
  saveThemeExplanation: (newExplanation: string) => void;
  saveThemeImage: (newImage: string) => void;
  saveThemeYoutubeVideoUrl: (newUrl: string) => void;
  saveLessonTitle: (newTitle: string) => void;
  saveLessonExplanation: (newExplanation: string) => void;
  createNewLesson: () => void;
  createNewActivity: (lessonId: string) => void;
  deleteLesson: (lessonId: string) => void;
  adminThemeDialog: IAdminThemeDialog;
}
