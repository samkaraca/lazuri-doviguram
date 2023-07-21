import { ReactNode, createContext, useContext } from "react";
import { Theme } from "@/core/models/entities/learning_unit";
import { useBaseViewModel } from "../use_base_view_model";
import { BaseViewModel } from "../../model/base_view_model";

const BaseViewModelContext = createContext<BaseViewModel | null>(null);

export function BaseViewModel({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  const viewModel = useBaseViewModel(theme);

  return (
    <BaseViewModelContext.Provider value={viewModel}>
      {children}
    </BaseViewModelContext.Provider>
  );
}

export const useBaseViewModelContext = () => useContext(BaseViewModelContext);
