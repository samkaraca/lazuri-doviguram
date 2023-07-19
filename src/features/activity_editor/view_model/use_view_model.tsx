import { useEffect, useState } from "react";
import { IViewModel } from "../model/view_model";
import { Activity } from "@/core/models/entities/learning_unit";
import { nanoid } from "nanoid";
import {
  FillInBlanksQuestion,
  MultipleChoiceQuestion,
  Question,
  SimpleQuestion,
  TrueFalseQuestion,
} from "@/core/models/entities/question";
import { persistActivity } from "../services/persist_activity";
import { usePathname } from "next/navigation";
import { ExerciseConverter } from "../services/exercise_converter";

export function useViewModel(beginningActivityData: Activity<any>): IViewModel {
  const pathname = usePathname();
  const [activityType, setActivityType] =
    useState<IViewModel["activityType"]>("true-false");
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [textContent, setTextContent] = useState("");
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState<
    IViewModel["youtubeVideoUrl"]
  >({
    value: "",
    status: "idle",
  });
  const [image, setImage] = useState<IViewModel["image"]>({
    value: "",
    status: "idle",
  });
  const [audio, setAudio] = useState<IViewModel["audio"]>({
    value: "",
    status: "idle",
  });

  const changeActivityType = (newActivityType: IViewModel["activityType"]) => {
    setFillInBlanksExercise(new Map());
    setMultipleChoiceExercise(new Map());
    setTrueFalseExercise(new Map());
    setSimpleExercise(new Map());
    setActivityType(newActivityType);
  };

  const [fillInBlanksExercise, setFillInBlanksExercise] = useState<
    IViewModel["fillInBlanksExercise"]
  >(new Map());
  const [multipleChoiceExercise, setMultipleChoiceExercise] = useState<
    IViewModel["multipleChoiceExercise"]
  >(new Map());
  const [trueFalseExercise, setTrueFalseExercise] = useState<
    IViewModel["trueFalseExercise"]
  >(new Map());
  const [simpleExercise, setSimpleExercise] = useState<
    IViewModel["simpleExercise"]
  >(new Map());

  const saveActivity = async () => {
    const activityModifier = new ExerciseConverter().fromMap({
      activityType,
      fillInBlanksExercise,
      multipleChoiceExercise,
      simpleExercise,
      trueFalseExercise,
    });

    let activityToPersist: Activity<any> = {
      activityType: "drag-into-blanks",
      questions: [] as FillInBlanksQuestion[],
      title,
      explanation,
      audio: audio.status === "success" ? audio.value : null,
      image: image.status === "success" ? image.value : null,
      youtubeVideoUrl:
        youtubeVideoUrl.status === "success" ? youtubeVideoUrl.value : null,
      textContent: textContent ? textContent : null,
    };

    await persistActivity(pathname, {
      ...activityToPersist,
      ...activityModifier,
    });
  };

  useEffect(() => {
    const data = JSON.parse(
      JSON.stringify(beginningActivityData)
    ) as Activity<any>;
    const dataActivityType = data.activityType;
    const dataQuestions = data.questions;

    setTitle(data.title);
    setExplanation(data.explanation ?? "");
    setTextContent(data.textContent ?? "");
    setYoutubeVideoUrl(
      data.youtubeVideoUrl
        ? { value: data.youtubeVideoUrl, status: "success" }
        : { value: "", status: "idle" }
    );
    setImage(
      data.image
        ? { value: data.image, status: "success" }
        : { value: "", status: "idle" }
    );
    setAudio(
      data.audio
        ? { value: data.audio, status: "success" }
        : { value: "", status: "idle" }
    );
    setActivityType(dataActivityType);

    if (
      dataActivityType === "type-in-blanks" ||
      dataActivityType === "drag-into-blanks"
    ) {
      setFillInBlanksExercise(
        new Map(
          dataQuestions.map((question) => [
            nanoid(),
            FillInBlanksQuestion.from(question as FillInBlanksQuestion),
          ])
        )
      );
    } else if (dataActivityType === "multiple-choice") {
      setMultipleChoiceExercise(
        new Map(
          dataQuestions.map((question) => [
            nanoid(),
            MultipleChoiceQuestion.from(question as MultipleChoiceQuestion),
          ])
        )
      );
    } else if (dataActivityType === "true-false") {
      setTrueFalseExercise(
        new Map(
          dataQuestions.map((question) => [
            nanoid(),
            TrueFalseQuestion.from(question as TrueFalseQuestion),
          ])
        )
      );
    } else if (dataActivityType === "pair-texts-with-images") {
      setSimpleExercise(
        new Map(
          dataQuestions.map((question) => [
            nanoid(),
            SimpleQuestion.from(question as SimpleQuestion),
          ])
        )
      );
    }
  }, [beginningActivityData]);

  return {
    activityType,
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
    trueFalseExercise,
    setTrueFalseExercise,
    simpleExercise,
    setSimpleExercise,
    saveActivity,
  };
}
