import ILesson from "../lesson/lesson";

export default interface ITheme {
  createdAt: Date;
  _id: string;
  slug: string;
  title: string;
  explanation: string;
  image?: string | null;
  youtubeVideoUrl: string;
  lessons: ILesson[];
}
