import { ReactNode } from "react";
import { BaseViewModel } from "./context_providers/base_view_model";
import { AdminViewModel } from "./context_providers/admin_view_model";
import ITheme from "@/lib/theme/theme";

export function ViewModel({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ITheme;
}) {
  return (
    <BaseViewModel theme={theme}>
      <AdminViewModel>{children}</AdminViewModel>
    </BaseViewModel>
  );
}
