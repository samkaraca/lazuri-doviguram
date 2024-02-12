import IBlank from "./blank";
import IDraggable from "./draggable";

export default interface DndSetting {
  board: IDraggable[];
  blanks: IBlank[];
  draggedItem: IDraggable | null;
}
