import { ReactNode, createContext, useContext } from "react";
import { IViewModel } from "../model/view_model";
import { useViewModel } from "./use_view_model";
import { Activity } from "@/core/models/entities/learning_unit";

const ViewModelContext = createContext<IViewModel | null>(null);
const useViewModelContext = () => useContext(ViewModelContext);

export function ViewModel({
  children,
  beginningActivityData,
}: {
  children: ReactNode;
  beginningActivityData: Activity<any>;
}) {
  const viewModel = useViewModel(beginningActivityData);

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export default useViewModelContext;
