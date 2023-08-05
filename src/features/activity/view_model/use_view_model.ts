import { ViewModel } from "../model/view_model";
import { useEffect, useRef, useState } from "react";
import { stopDragging } from "@/lib/utils/dnd_setting/dnd_service";
import IDraggable from "@/lib/utils/dnd_setting/draggable";
import IActivity from "@/lib/activity/activity";
import IReply from "@/lib/exercise/reply";
import * as ExerciseServices from "@/lib/exercise/exercise_services";
import IBlank from "@/lib/utils/dnd_setting/blank";
import { nanoid } from "nanoid";
import IAnswer from "@/lib/exercise/answer";

export function useViewModel(
  activityData: IActivity,
  closeActivity?: () => void
): ViewModel {
  const [dndDraggedItem, setDndDraggedItem] = useState<{
    id: string;
    value: string;
  } | null>();
  const [isSolved, setIsSolved] = useState(false);
  const [dndBoard, setDndBoard] = useState<IDraggable[]>();
  const [replies, setReplies] = useState<IReply[]>();

  const boardFrom = (exerciseAnswers: IAnswer[], replies: IReply[]) => {
    const idBlackList = replies
      .filter((r) => r.value !== null && r.value !== undefined)
      .map((e) => e.id);
    const board = exerciseAnswers.filter((a) => !idBlackList.includes(a.id));
    return board.map((e) => ({ ...e, id: nanoid() }));
  };

  useEffect(() => {
    const { replies, beenSolved } = ExerciseServices.getUltimateReplies(
      activityData.id,
      activityData.savedAt,
      activityData.exercise
    );
    setReplies(replies);
    setIsSolved(beenSolved);
    setDndBoard(boardFrom(activityData.exercise.answers, replies));
  }, [activityData]);

  const handleStartDragging = (item: { id: string; value: string }) => {
    setDndDraggedItem(item);
  };

  const handleStopDragging = (
    action: { type: "on-space" } | { type: "on-blank"; blankId: string }
  ) => {
    if (!dndBoard || !replies || !dndDraggedItem) return;
    const { board, blanks, draggedItem } = stopDragging(
      {
        board: dndBoard,
        blanks: replies,
        draggedItem: dndDraggedItem,
      },
      action
    );
    setDndBoard(board);
    setReplies(blanks);
    setDndDraggedItem(draggedItem);
  };

  const finishActivity = () => {
    ExerciseServices.saveLocally(activityData.id, {
      grade: ExerciseServices.getGrade(activityData.exercise, replies!),
      replies: replies!,
      savedAt: Date.now(),
    });
    setIsSolved(true);
  };

  const reattemptToActivity = () => {
    ExerciseServices.saveLocally(activityData.id, {
      grade: ExerciseServices.getGrade(activityData.exercise, replies!),
      replies: null,
      savedAt: Date.now(),
    });
    const newReplies = ExerciseServices.getRrepliesTemplate(
      activityData.exercise
    );
    setIsSolved(false);
    setReplies(newReplies);
    setDndBoard(boardFrom(activityData.exercise.answers, newReplies));
  };

  return {
    isSolved,
    activityData,
    dndBoard,
    replies,
    setReplies,
    setIsSolved,
    closeActivity,
    finishActivity,
    reattemptToActivity,
    handleStartDragging,
    handleStopDragging,
  };
}
