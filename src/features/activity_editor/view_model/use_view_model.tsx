import { useEffect, useRef, useState } from "react";
import { IViewModel } from "../model/view_model";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";
import { Activity } from "@/lib/activity/activity";
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { MultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";
import ActivityAdminService from "@/lib/services/activity_admin_service";

export function useViewModel(
  themeId: string,
  lessonId: string,
  activityData: Activity
): IViewModel {
  const adminService = useRef(new ActivityAdminService());
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
  const [fillInBlanksExercise, setFillInBlanksExercise] = useState<
    IViewModel["fillInBlanksExercise"]
  >(new FillInBlanksExercise([]));
  const [multipleChoiceExercise, setMultipleChoiceExercise] = useState<
    IViewModel["multipleChoiceExercise"]
  >(new MultipleChoiceExercise([]));
  const [simpleExercise, setSimpleExercise] = useState<
    IViewModel["simpleExercise"]
  >(new SimpleExercise([]));

  const changeActivityType = (newActivityType: IViewModel["type"]) => {
    setFillInBlanksExercise(new FillInBlanksExercise([]));
    setMultipleChoiceExercise(new MultipleChoiceExercise([]));
    setSimpleExercise(new SimpleExercise([]));
    setType(newActivityType);
  };

  const saveActivity = async () => {
    try {
      await adminService.current.saveActivity(themeId, lessonId, {
        id: activityData.id,
        title,
        explanation,
        textContent,
        savedAt: Date.now(),
        type,
        audio: audio.status === "success" ? audio.value : activityData.audio,
        exercise:
          type === "type-in-blanks" || type === "drag-into-blanks"
            ? fillInBlanksExercise
            : type === "pair-texts-with-images" || type === "true-false"
            ? simpleExercise
            : multipleChoiceExercise,
        image: image.status === "success" ? image.value : activityData.image,
        youtubeVideoUrl:
          youtubeVideoUrl.status === "success"
            ? youtubeVideoUrl.value
            : activityData.youtubeVideoUrl,
      });
      localStorage.removeItem(activityData.id);
    } catch (error) {}
  };

  useEffect(() => {
    if (
      activityData.type === "drag-into-blanks" ||
      activityData.type === "type-in-blanks"
    ) {
      setFillInBlanksExercise(activityData.exercise as any);
    } else if (
      activityData.type === "pair-texts-with-images" ||
      activityData.type === "true-false"
    ) {
      setSimpleExercise(activityData.exercise as any);
    } else if (activityData.type === "multiple-choice") {
      setMultipleChoiceExercise(activityData.exercise as any);
    }
  }, [activityData]);

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
    fillInBlanksExercise,
    setFillInBlanksExercise,
    multipleChoiceExercise,
    setMultipleChoiceExercise,
    simpleExercise,
    setSimpleExercise,
    saveActivity,
  };
}
