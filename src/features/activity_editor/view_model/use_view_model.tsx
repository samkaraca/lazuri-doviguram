import { useState } from "react";
import { IViewModel } from "../model/view_model";
import IActivity from "@/lib/activity/activity";
import IExercise from "@/lib/exercise/exercise";
import { useAdminUpdateActivity } from "@/api/activity/useAdminUpdateActivity";
import { toast } from "sonner";

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
  const [image, setImage] = useState<string>(activityData.image || "");
  const [audio, setAudio] = useState<string>(activityData.audio || "");
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
      toast("Etkinlik kaydediliyor...");
      await adminUpdateActivity({
        themeId,
        lessonId,
        activity: {
          _id: activityData._id,
          title,
          explanation,
          textContent,
          savedAt: Date.now(),
          type,
          audio,
          exercise,
          image,
          youtubeVideoUrl:
            youtubeVideoUrl.status === "success"
              ? youtubeVideoUrl.value
              : activityData.youtubeVideoUrl,
        },
      });
      toast.success("Etkinlik başarıyla kaydedildi!");
      localStorage.removeItem(activityData._id);
    } catch (error) {
    }
  };

  return {
    _id: activityData._id,
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
