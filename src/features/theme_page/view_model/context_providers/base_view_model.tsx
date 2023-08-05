import { ReactNode, createContext, useContext } from "react";
import { useBaseViewModel } from "../use_base_view_model";
import { BaseViewModel } from "../../model/base_view_model";
import ITheme from "@/lib/theme/theme";

const BaseViewModelContext = createContext<BaseViewModel | null>(null);

export function BaseViewModel({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ITheme;
}) {
  const viewModel = useBaseViewModel(theme);

  return (
    <BaseViewModelContext.Provider value={viewModel}>
      {children}
    </BaseViewModelContext.Provider>
  );
}

export const useBaseViewModelContext = () => useContext(BaseViewModelContext);
