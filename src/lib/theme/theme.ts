import ILesson from "../lesson/lesson";

export default interface ITheme {
  createdAt: number;
  id: string;
  title: string;
  explanation: string;
  image: string;
  youtubeVideoUrl: string;
  lessons: ILesson[];
}
