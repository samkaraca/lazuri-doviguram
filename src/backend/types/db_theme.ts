import { DBLesson } from "./db_lesson";

export interface DBTheme {
  pk: "theme";
  id: string;
  title: string;
  explanation: string;
  image: string;
  youtubeVideoUrl: string;
  createdAt: number;
  lessons: {
    idOrder: string[] | any;
    [key: string]: DBLesson;
  };
}
