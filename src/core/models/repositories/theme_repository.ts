import {
  AttributeValue,
  DeleteItemCommandOutput,
  UpdateItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { ThemeMetaDTO } from "../dtos/theme_meta_dto";
import { Activity, Theme } from "../entities/learning_unit";

export interface ThemeRepository {
  getThemeMetas(): Promise<ThemeMetaDTO[]>;
  getThemeData(themePath: string): Promise<Theme>;
  saveThemeTitle(themePath: string, newTitle: string): Promise<any>;
  saveThemeExplanation(newExplanation: string, themeId: string): Promise<any>;
  saveThemeImage(newImage: string, themeId: string): Promise<any>;
  saveThemeYoutubeVideoUrl(
    newYoutubeVideoUrl: string,
    themeId: string
  ): Promise<any>;
  saveLessonTitle(
    newTitle: string,
    themeId: string,
    lessonIndex: number
  ): Promise<any>;
  saveLessonExplanation(
    newExplanation: string,
    themeId: string,
    lessonId: string
  ): Promise<any>;
  createNewTheme: () => Promise<string>;
  createNewLesson: (themeId: string) => Promise<Record<string, any>>;
  deleteTheme: (themeId: string) => Promise<DeleteItemCommandOutput>;
  deleteLesson: (
    themeId: string,
    lessonId: string
  ) => Promise<UpdateItemCommandOutput>;
  createNewActivity: (
    themeId: string,
    lessonId: string
  ) => Promise<{
    meta: string;
    activity: Activity<any>;
  }>;
  saveActivity: (
    themeId: string,
    lessonId: string,
    activityId: string,
    activity: Activity<any>
  ) => Promise<void>;
  getActivity: (themeId: string) => Promise<Record<string, AttributeValue>>;
}
