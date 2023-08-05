import ITheme from "@/lib/theme/theme";
import { View } from "./view";
import { ViewModel } from "./view_model";
import { ReactNode } from "react";

export default function ThemePage({
  theme,
  home,
  adminTools,
}: {
  theme: ITheme;
  home: "/admin" | "/";
  adminTools?: ReactNode;
}) {
  return (
    <ViewModel theme={theme}>
      <View adminTools={adminTools} home={home} />
    </ViewModel>
  );
}
