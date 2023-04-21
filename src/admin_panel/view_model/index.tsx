import { ReactNode, createContext, useContext } from "react";
import { useViewModel } from "./use_view_model";
import { IViewModel } from "../model/view_model";
import { Theme } from "../model/theme";

const ViewModelContext = createContext<IViewModel | null>(null);

export function ViewModel({
  children,
  data,
}: {
  children: ReactNode;
  data: Theme[];
}) {
  const viewModel = useViewModel(data);

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export const useViewModelContext = () => useContext(ViewModelContext);
