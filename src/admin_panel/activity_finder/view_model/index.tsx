import { createContext, useContext } from "react";
import useViewModel from "./use_view_model";
import { ElementChildren } from "@/core/types";
import { IViewModel } from "../model/view_model";

const ViewModelContext = createContext<IViewModel | null>(null);

export default function ViewModel({ children }: ElementChildren) {
  const viewModel = useViewModel();

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export const useViewModelContext = () => useContext(ViewModelContext);
