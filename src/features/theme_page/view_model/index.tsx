import { ReactNode } from "react";
import { Theme } from "@/core/models/entities/learning_unit";
import { BaseViewModel } from "./context_providers/base_view_model";
import { AdminViewModel } from "./context_providers/admin_view_model";

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
