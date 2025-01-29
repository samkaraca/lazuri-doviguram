import { IViewModel } from "../model/view_model";
import { useEffect, useState } from "react";
import IDraggable from "@/lib/dnd_setting/draggable";
import IActivity from "@/lib/activity/activity";
import IReply from "@/lib/exercise/reply";
import * as ExerciseServices from "@/lib/exercise/exercise_services";
import * as DndService from "@/lib/dnd_setting/dnd_services";

export function useViewModel(
  activityData: IActivity,
  closeActivity?: () => void
): IViewModel {
  const [dndDraggedItem, setDndDraggedItem] = useState<{
    id: string;
    value: string;
  } | null>();
  const [isSolved, setIsSolved] = useState(false);
  const [dndBoard, setDndBoard] = useState<IDraggable[]>();
  const [replies, setReplies] = useState<IReply[]>();

  useEffect(() => {
    const { replies, beenSolved } = ExerciseServices.getUltimateReplies(
      activityData._id,
      activityData.savedAt,
      activityData.exercise
    );
    setReplies(replies);
    setIsSolved(beenSolved);
    setDndBoard(DndService.boardFrom(activityData.exercise, replies));
  }, [activityData]);

  const handleStartDragging = (item: { id: string; value: string }) => {
    setDndDraggedItem(item);
  };

  const handleStopDragging = (
    action: { type: "on-space" } | { type: "on-blank"; blankId: string }
  ) => {
    if (!dndBoard || !replies || !dndDraggedItem) return;
    const { board, blanks, draggedItem } = DndService.stopDragging(
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
    ExerciseServices.saveLocally(activityData._id, {
      grade: ExerciseServices.getGrade(activityData.exercise, replies!),
      replies: replies!,
      savedAt: Date.now(),
    });
    setIsSolved(true);
  };

  const reattemptToActivity = () => {
    ExerciseServices.saveLocally(activityData._id, {
      grade: ExerciseServices.getGrade(activityData.exercise, replies!),
      replies: null,
      savedAt: Date.now(),
    });
    const newReplies = ExerciseServices.getRepliesTemplate(
      activityData.exercise
    );
    setIsSolved(false);
    setReplies(newReplies);
    setDndBoard(DndService.boardFrom(activityData.exercise, newReplies));
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
