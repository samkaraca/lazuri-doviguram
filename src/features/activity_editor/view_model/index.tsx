import { ReactNode, createContext, useContext } from "react";
import { IViewModel } from "../model/view_model";
import { useViewModel } from "./use_view_model";
import IActivity from "@/lib/activity/activity";

const ViewModelContext = createContext<IViewModel | null>(null);
const useViewModelContext = () => useContext(ViewModelContext);

export function ViewModel({
  children,
  themeId,
  lessonId,
  activityData,
}: {
  children: ReactNode;
  themeId: string;
  lessonId: string;
  activityData: IActivity;
}) {
  const viewModel = useViewModel(themeId, lessonId, activityData);

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export default useViewModelContext;
