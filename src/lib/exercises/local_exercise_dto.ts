import { Exercise } from "./exercise";

export interface LocalExerciseDTO {
  exercise: Exercise<unknown>;
  grade: number;
}
