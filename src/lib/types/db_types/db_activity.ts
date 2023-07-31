export interface DBActivity {
  title: string;
  explanation: string;
  textContent: string | null;
  image: string | null;
  youtubeVideoUrl: string | null;
  audio: string | null;
  type:
    | "true-false"
    | "type-in-blanks"
    | "drag-into-blanks"
    | "multiple-choice"
    | "pair-texts-with-images";
  savedAt: number;
  exercise: any;
}
