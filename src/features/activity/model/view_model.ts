import IActivity from "@/lib/activity/activity";
import IReply from "@/lib/exercise/reply";
import IDraggable from "@/lib/utils/dnd_setting/draggable";
import { Dispatch, SetStateAction } from "react";

export interface ViewModel {
  isSolved: boolean;
  activityData: IActivity;
  dndBoard: IDraggable[] | undefined;
  replies: IReply[] | undefined;
  setReplies: Dispatch<SetStateAction<ViewModel["replies"]>>;
  setIsSolved: Dispatch<SetStateAction<ViewModel["isSolved"]>>;
  closeActivity?: VoidFunction;
  finishActivity: VoidFunction;
  reattemptToActivity: VoidFunction;
  handleStopDragging: (
    action:
      | {
          type: "on-space";
        }
      | {
          type: "on-blank";
          blankId: string;
        }
  ) => void;
  handleStartDragging: (item: { id: string; value: string }) => void;
}
