import IActivity from "@/lib/activity/activity";
import IReply from "@/lib/exercise/reply";
import IDraggable from "@/lib/dnd_setting/draggable";
import { Dispatch, SetStateAction } from "react";

export interface IViewModel {
  isSolved: boolean;
  activityData: IActivity;
  dndBoard: IDraggable[] | undefined;
  replies: IReply[] | undefined;
  setReplies: Dispatch<SetStateAction<IViewModel["replies"]>>;
  setIsSolved: Dispatch<SetStateAction<IViewModel["isSolved"]>>;
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
