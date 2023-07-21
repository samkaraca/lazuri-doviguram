import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DeleteForever,
  DeleteOutline,
  DesignServices,
  WarningAmber,
} from "@mui/icons-material";
import styles from "./lesson_side_bar.module.scss";
import { TextField } from "@mui/material";
import { useBaseViewModelContext } from "../theme_page/view_model/context_providers/base_view_model";
import { useAdminViewModelContext } from "../theme_page/view_model/context_providers/admin_view_model";
import { usePathname, useRouter } from "next/navigation";

export function LessonSideBar({
  isOpen,
  setIsOpen,
  hide,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hide: boolean;
}) {
  const pathname = usePathname();
  const { push } = useRouter();
  const [modified, setModified] = useState(false);
  const [adminLessonTitle, setAdminLessonTitle] = useState("");
  const [adminLessonExplanation, setAdminLessonExplanation] = useState("");
  const { activeLesson, lessons } = useBaseViewModelContext()!;
  const {
    saveLesson,
    createNewLesson,
    deleteLesson,
    createNewActivity,
    deleteActivity,
  } = useAdminViewModelContext()!;

  useEffect(() => {
    reset();
  }, [activeLesson]);

  const reset = () => {
    const { id, title } = lessons.meta[activeLesson];
    const { explanation } = lessons[id];
    setAdminLessonExplanation(explanation);
    setAdminLessonTitle(title);
  };

  useEffect(() => {
    setModified(false);
    const { id, title } = lessons.meta[activeLesson];
    const { explanation } = lessons[id];
    if (title !== adminLessonTitle || explanation !== adminLessonExplanation) {
      setModified(true);
    }
  });

  return (
    <aside className={`side-bar ${styles["lesson-side-bar"]}`}>
      <div
        className={`content`}
        style={{ display: isOpen ? undefined : "none" }}
      >
        <header>
          <h3>Ders Editörü</h3>
          <button onClick={createNewLesson} className="simple">
            Yeni ders ekle
          </button>
        </header>
        <div className="main">
          {modified && (
            <div className={"warning"}>
              <WarningAmber />
              <div className={"content"}>
                <span>Kaydedilmemiş değişiklikler var.</span>
                <div className={"actions"}>
                  <button onClick={reset}>Geri al</button>
                  <button
                    onClick={() =>
                      saveLesson({
                        title: adminLessonTitle,
                        explanation: adminLessonExplanation,
                      })
                    }
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
          <h2>Ders {activeLesson + 1}</h2>
          <div className="input-container">
            <label htmlFor="admin-lesson-title-input">Ders Adı</label>
            <TextField
              id="admin-lesson-title-input"
              size="small"
              placeholder="Ders 1..."
              value={adminLessonTitle}
              onChange={(e) => setAdminLessonTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="admin-lesson-explanation-input">
              Ders Açıklaması
            </label>
            <TextField
              id="admin-lesson-explanation-input"
              size="small"
              placeholder="Bu derste aile üyeleri ile ilgili..."
              value={adminLessonExplanation}
              onChange={(e) => setAdminLessonExplanation(e.target.value)}
            />
          </div>
          <div className={`${styles["activity-list"]}`}>
            <h3>Aktiviteler</h3>
            <ol className={`simple`}>
              {lessons[
                lessons.meta[activeLesson].id
              ].activities.idOrderMeta.map((id, activityIndex) => {
                const { title } =
                  lessons[lessons.meta[activeLesson].id].activities[id];
                return (
                  <li key={id}>
                    <div>
                      <p>{title}</p>
                      <div className={styles["group"]}>
                        <button
                          onClick={() =>
                            push(
                              `${pathname}/${lessons.meta[activeLesson].id}/${id}`
                            )
                          }
                          className="simple"
                        >
                          <DesignServices />
                        </button>
                        <button
                          onClick={() =>
                            deleteActivity({ activityId: id, activityIndex })
                          }
                          className="simple error"
                        >
                          <DeleteForever />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <button onClick={createNewActivity} className="simple">
              Yeni +
            </button>
          </div>
        </div>
        <footer>
          <div>
            <button onClick={deleteLesson} className="simple error">
              <span>Dersi sil</span>
              <DeleteOutline />
            </button>
          </div>
        </footer>
      </div>
      <button
        style={{ transform: hide ? "translate(-100%, 0)" : undefined }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={"open-close open-close-right"}
      >
        Ders
        <DesignServices />
      </button>
    </aside>
  );
}
