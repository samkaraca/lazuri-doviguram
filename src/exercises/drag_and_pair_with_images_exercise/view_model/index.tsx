import { Context, ReactNode, createContext, useContext } from "react";
import { useViewModel } from "./use_view_model";
import { ExerciseModel, IViewModel } from "../model/view_model";

const ViewModelContext = createContext<IViewModel | null>(null);

export function ViewModel({
  children,
  exercise,
}: {
  children: ReactNode;
  exercise: ExerciseModel;
}) {
  const viewModel = useViewModel(exercise);

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export const useViewModelContext = () => useContext(ViewModelContext);
