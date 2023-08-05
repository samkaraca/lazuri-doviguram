import IReply from "./reply";

export default interface ILocalExerciseData {
  grade: number;
  savedAt: number;
  replies: IReply[] | null;
}
