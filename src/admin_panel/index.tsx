import { Theme } from "./model/theme";
import { View } from "./view";
import { ViewModel } from "./view_model";

export function AdminPanel({ data }: { data: Theme[] }) {
  return (
    <ViewModel data={data}>
      <View />
    </ViewModel>
  );
}
