import IExercise from "../exercise/exercise";

export default interface IActivity {
  id: string;
  title: string;
  explanation: string;
  textContent: string | null;
  image: string | null;
  youtubeVideoUrl: string | null;
  audio: string | null;
  savedAt: number;
  type:
    | "true-false"
    | "type-in-blanks"
    | "drag-into-blanks"
    | "multiple-choice"
    | "pair-texts-with-images";
  exercise: IExercise;
}
