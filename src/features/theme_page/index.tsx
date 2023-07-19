import { Theme } from "@/core/models/entities/learning_unit";
import { View } from "./view";
import { ViewModel } from "./view_model";

export function ThemePage({
  theme,
  isAdmin,
}: {
  theme: Theme;
  isAdmin: boolean;
}) {
  return (
    <ViewModel theme={theme} isAdmin={isAdmin}>
      <View />
    </ViewModel>
  );
}
