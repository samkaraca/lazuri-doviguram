import { Theme } from "@/core/models/entities/learning_unit";
import { View } from "./view";
import { ViewModel } from "./view_model";
import { ReactNode } from "react";

export function ThemePage({
  theme,
  home,
  adminTools,
}: {
  theme: Theme;
  home: "/admin" | "/";
  adminTools?: ReactNode;
}) {
  return (
    <ViewModel theme={theme}>
      <View adminTools={adminTools} home={home} />
    </ViewModel>
  );
}
