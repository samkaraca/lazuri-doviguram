import { ReactNode, createContext, useContext } from "react";
import { useViewModel } from "./use_view_model";
import { IViewModel } from "../model/view_model";
import IActivity from "@/lib/activity/activity";

const ViewModelContext = createContext<IViewModel | null>(null);
const useViewModelContext = () => useContext(ViewModelContext);

export function ViewModel({
  children,
  activityData,
  closeActivity,
}: {
  children: ReactNode;
  activityData: IActivity;
  closeActivity?: VoidFunction;
}) {
  const viewModel = useViewModel(activityData, closeActivity);

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export default useViewModelContext;
