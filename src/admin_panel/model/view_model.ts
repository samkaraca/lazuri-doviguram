import { Dispatch, SetStateAction } from "react";
import { IDialog } from "./dialog";
import { Theme } from "./theme";

export interface IViewModel {
  data: Theme[];
  dialog: IDialog;
  setDialog: Dispatch<SetStateAction<IViewModel["dialog"]>>;
  saveNewTheme: () => void;
}
