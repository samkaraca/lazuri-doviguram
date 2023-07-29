import { ReactNode } from "react";
import { BaseViewModel } from "./context_providers/base_view_model";
import { AdminViewModel } from "./context_providers/admin_view_model";
import { Theme } from "@/lib/theme/theme";

export function ViewModel({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  return (
    <BaseViewModel theme={theme}>
      <AdminViewModel>{children}</AdminViewModel>
    </BaseViewModel>
  );
}
