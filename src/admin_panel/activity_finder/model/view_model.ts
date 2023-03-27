import { Directory } from "./directory";
import { Dispatch, FormEvent, SetStateAction } from "react";

export interface IViewModel {
  goTo: (pathCode: string) => void;
  goBack: () => void;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  newDirectoryName: string;
  setNewDirectoryName: Dispatch<SetStateAction<string>>;
  saveNewDirectory: (e: FormEvent<HTMLFormElement>) => void;
  directory: Directory;
}
