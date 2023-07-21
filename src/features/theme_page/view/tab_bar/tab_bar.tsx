import { Tab, Tabs } from "@mui/material";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../../model/base_view_model";

export function TabBar() {
  const { lessons, activeLesson, setActiveLesson } =
    useBaseViewModelContext() as BaseViewModel;

  if (activeLesson === null) return null;

  return (
    <Tabs
      value={activeLesson}
      centered
      onChange={(e, newValue) => setActiveLesson(newValue)}
    >
      {lessons.meta.map((lesson: any, i: number) => {
        return <Tab key={lesson.id} label={`Ders ${i + 1}`} />;
      })}
    </Tabs>
  );
}
