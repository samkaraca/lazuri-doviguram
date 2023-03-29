import { ElementChildren } from "@/core/types";
import { createContext, useContext } from "react";
import { useViewModel } from "./use_view_model";
import { IViewModel } from "../model/view_model";

const ViewModelContext = createContext<IViewModel | null>(null);
const useViewModelContext = () => useContext(ViewModelContext);

export function ViewModel({ children }: ElementChildren) {
  const viewModel = useViewModel();
  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export default useViewModelContext;
