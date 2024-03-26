import { Tab, Tabs } from "@mui/material";
import { useBaseViewModelContext } from "../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../model/base_view_model";

export function TabBar() {
  const { lessons, changeActiveLesson, activeLesson } =
    useBaseViewModelContext() as BaseViewModel;

  if (activeLesson === null) return null;

  return (
    <Tabs
      variant="scrollable"
      scrollButtons={true}
      allowScrollButtonsMobile
      centered
      value={activeLesson}
      onChange={(e, newValue) => changeActiveLesson(newValue)}
      sx={{ maxWidth: "100%", width: "max-content", margin: "0 auto" }}
    >
      {lessons.map(({ id }, i: number) => {
        return <Tab key={id} label={`Ders ${i + 1}`} />;
      })}
    </Tabs>
  );
}
