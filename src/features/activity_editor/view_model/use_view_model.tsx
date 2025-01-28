import { useState } from "react";
import { IViewModel } from "../model/view_model";
import IActivity from "@/lib/activity/activity";
import IExercise from "@/lib/exercise/exercise";
import { useAdminUpdateActivity } from "@/api/activity/useAdminUpdateActivity";

export function useViewModel(
  themeId: string,
  lessonId: string,
  activityData: IActivity
): IViewModel {
  const { mutateAsync: adminUpdateActivity } = useAdminUpdateActivity();
  const [type, setType] = useState<IViewModel["type"]>(activityData.type);
  const [title, setTitle] = useState(activityData.title);
  const [explanation, setExplanation] = useState(activityData.explanation);
  const [textContent, setTextContent] = useState(
    activityData.textContent ?? ""
  );
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<
    IViewModel["youtubeVideoUrl"]
  >(
    activityData.youtubeVideoUrl
      ? {
        value: activityData.youtubeVideoUrl,
        status: "success",
      }
      : {
        value: "",
        status: "idle",
      }
  );
  const [image, setImage] = useState<IViewModel["image"]>(
    activityData.image
      ? {
        value: activityData.image,
        status: "success",
      }
      : {
        value: "",
        status: "idle",
      }
  );
  const [audio, setAudio] = useState<IViewModel["audio"]>(
    activityData.audio
      ? {
        value: activityData.audio,
        status: "success",
      }
      : {
        value: "",
        status: "idle",
      }
  );
  const [exercise, setExercise] = useState<IExercise>(activityData.exercise);

  const changeActivityType = (newActivityType: IViewModel["type"]) => {
    const exerciseType: IExercise["type"] =
      newActivityType === "drag-into-blanks" ||
        newActivityType === "type-in-blanks"
        ? "fill-in-blanks-exercise"
        : newActivityType === "pair-texts-with-images" ||
          newActivityType === "true-false"
          ? "qa-exercise"
          : "multiple-choice-exercise";
    setType(newActivityType);
    setExercise({ type: exerciseType, answers: [], template: [] });
  };

  const saveActivity = async () => {
    try {
      await adminUpdateActivity({
        themeId,
        lessonId,
        activity: {
          id: activityData.id,
          title,
          explanation,
          textContent,
          savedAt: Date.now(),
          type,
          audio: audio.status === "success" ? audio.value : activityData.audio,
          exercise,
          image: image.status === "success" ? image.value : activityData.image,
          youtubeVideoUrl:
            youtubeVideoUrl.status === "success"
              ? youtubeVideoUrl.value
              : activityData.youtubeVideoUrl,
        },
      });
      localStorage.removeItem(activityData.id);
    } catch (error) { }
  };

  return {
    id: activityData.id,
    savedAt: activityData.savedAt,
    type,
    changeActivityType,
    title,
    setTitle,
    explanation,
    setExplanation,
    textContent,
    setTextContent,
    image,
    setImage,
    audio,
    setAudio,
    youtubeVideoUrl,
    setYoutubeVideoUrl,
    exercise,
    setExercise,
    saveActivity,
  };
}
