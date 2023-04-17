import { IExerciseItemContent } from "./activity";

export type IDragAndPairWithImagesActivityType = "drag-and-pair-with-images";

export interface IDragAndPairWithImagesExerciseItemContent
  extends IExerciseItemContent {
  imageName: string;
}
