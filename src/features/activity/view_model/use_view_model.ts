import { ViewModel } from "../model/view_model";
import { useEffect, useRef, useState } from "react";
import { stopDragging } from "@/lib/utils/dnd_setting/dnd_service";
import IDraggable from "@/lib/utils/dnd_setting/draggable";
import IActivity from "@/lib/activity/activity";
import IReply from "@/lib/exercise/reply";
import * as ExerciseServices from "@/lib/exercise/exercise_services";

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

  useEffect(() => {
    const { replies, beenSolved } = ExerciseServices.getUltimateReplies(
      activityData.id,
      activityData.savedAt,
      activityData.exercise
    );
    setReplies(replies);
    setIsSolved(beenSolved);
    setDndBoard(activityData.exercise.answers);
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
    setIsSolved(false);
    setReplies(ExerciseServices.getRrepliesTemplate(activityData.exercise));
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
