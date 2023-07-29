import { useEffect, useState } from "react";
import { IViewModel } from "../model/view_model";
import { nanoid } from "nanoid";
import { FillInBlanksExercise } from "@/lib/exercises/fill_in_blanks_exercise";
import { Activity } from "@/lib/activity/activity";
import { SimpleExercise } from "@/lib/exercises/simple_question_exercise";
import { MultipleChoiceExercise } from "@/lib/exercises/multiple_choice_exercise";

export function useViewModel(beginningActivityData: Activity): IViewModel {
  const [type, setType] = useState<IViewModel["type"]>(
    beginningActivityData.type
  );
  const [title, setTitle] = useState(beginningActivityData.title);
  const [explanation, setExplanation] = useState(
    beginningActivityData.explanation
  );
  const [textContent, setTextContent] = useState(
    beginningActivityData.textContent ?? ""
  );
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<
    IViewModel["youtubeVideoUrl"]
  >(
    beginningActivityData.youtubeVideoUrl
      ? {
          value: beginningActivityData.youtubeVideoUrl,
          status: "success",
        }
      : {
          value: "",
          status: "idle",
        }
  );
  const [image, setImage] = useState<IViewModel["image"]>(
    beginningActivityData.image
      ? {
          value: beginningActivityData.image,
          status: "success",
        }
      : {
          value: "",
          status: "idle",
        }
  );
  const [audio, setAudio] = useState<IViewModel["audio"]>(
    beginningActivityData.audio
      ? {
          value: beginningActivityData.audio,
          status: "success",
        }
      : {
          value: "",
          status: "idle",
        }
  );
  const [fillInBlanksExercise, setFillInBlanksExercise] = useState<
    IViewModel["fillInBlanksExercise"]
  >(new FillInBlanksExercise(nanoid(), []));
  const [multipleChoiceExercise, setMultipleChoiceExercise] = useState<
    IViewModel["multipleChoiceExercise"]
  >(new MultipleChoiceExercise(nanoid(), []));
  const [simpleExercise, setSimpleExercise] = useState<
    IViewModel["simpleExercise"]
  >(new SimpleExercise(nanoid(), []));

  const changeActivityType = (newActivityType: IViewModel["type"]) => {
    setFillInBlanksExercise(new FillInBlanksExercise(nanoid(), []));
    setMultipleChoiceExercise(new MultipleChoiceExercise(nanoid(), []));
    setSimpleExercise(new SimpleExercise(nanoid(), []));
    setType(newActivityType);
  };

  const saveActivity = async () => {};

  return {
    id: beginningActivityData.id,
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
