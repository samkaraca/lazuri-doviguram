import { Button, Tab, Tabs } from "@mui/material";
import { useBaseViewModelContext } from "../../view_model/context_providers/base_view_model";
import { BaseViewModel } from "../../model/base_view_model";
import { Add } from "@mui/icons-material";
import { useAdminViewModelContext } from "../../view_model/context_providers/admin_view_model";

export function TabBar() {
  const { lessons, activeLesson, setActiveLesson, isAdmin } =
    useBaseViewModelContext() as BaseViewModel;
  const { createNewLesson } = useAdminViewModelContext()!;

  return (
    <Tabs
      value={activeLesson}
      centered
      onChange={(e, newValue) => setActiveLesson(newValue)}
    >
      {lessons.meta.map((lesson: any, i: number) => {
        return <Tab key={lesson.id} label={`Ders ${i + 1}`} />;
      })}

      {isAdmin && (
        <button
          onClick={createNewLesson}
          style={{
            borderRadius: 0,
            backgroundColor: "steelblue",
            width: "4rem",
          }}
        >
          <Add style={{ verticalAlign: "middle", color: "white" }} />
        </button>
      )}
    </Tabs>
  );
}
