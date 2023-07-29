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
  const { lessons, activeLesson } = useBaseViewModelContext()!;
  const {
    saveLesson,
    createLesson,
    deleteLesson,
    createActivity,
    deleteActivity,
  } = useAdminViewModelContext()!;

  useEffect(() => {
    reset();
  }, [activeLesson]);

  const reset = () => {
    if (activeLesson === null) return;
    const { title, explanation } = lessons[activeLesson];
    setAdminLessonExplanation(explanation);
    setAdminLessonTitle(title);
    setModified(false);
  };

  useEffect(() => {
    if (activeLesson === null) return;
    setModified(false);
    const { id, title, explanation } = lessons[activeLesson];
    if (title !== adminLessonTitle || explanation !== adminLessonExplanation) {
      setModified(true);
    }
  }, [adminLessonExplanation, adminLessonTitle]);

  return (
    <aside className={`side-bar ${styles["lesson-side-bar"]}`}>
      <div
        className={`content`}
        style={{ display: isOpen ? undefined : "none" }}
      >
        <header>
          <h3>Ders Editörü</h3>
          <button onClick={createLesson} className="simple">
            Yeni ders ekle
          </button>
        </header>
        {activeLesson !== null && (
          <div className="main">
            {modified && (
              <div className={"warning"}>
                <WarningAmber />
                <div className={"content"}>
                  <span>Kaydedilmemiş değişiklikler var.</span>
                  <div className={"actions"}>
                    <button onClick={reset}>Geri al</button>
                    <button
                      onClick={() => {
                        saveLesson({
                          id: lessons[activeLesson].id,
                          title: adminLessonTitle,
                          explanation: adminLessonExplanation,
                        });
                      }}
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
                multiline
                minRows={3}
                id="admin-lesson-explanation-input"
                size="small"
                placeholder="Bu derste aile üyeleri ile ilgili..."
                value={adminLessonExplanation}
                onChange={(e) => setAdminLessonExplanation(e.target.value)}
              />
            </div>
            <div className={`${styles["activity-list"]}`}>
              <header>
                <h3>Aktiviteler</h3>
              </header>
              <ol className={`simple`}>
                {activeLesson !== null &&
                  lessons[activeLesson].activities.map(({ id, title }) => {
                    return (
                      <li key={id}>
                        <div>
                          <p>{title}</p>
                          <div className={styles["group"]}>
                            <button
                              onClick={() =>
                                push(
                                  `${pathname}/${lessons[activeLesson].id}/${id}`
                                )
                              }
                              className="simple"
                            >
                              <DesignServices />
                            </button>
                            <button
                              onClick={() => deleteActivity(id)}
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
              <footer>
                <button onClick={createActivity} className="simple">
                  Yeni +
                </button>
              </footer>
            </div>
          </div>
        )}
        {activeLesson !== null && (
          <footer>
            <div>
              <button onClick={deleteLesson} className="simple error">
                <span>Dersi sil</span>
                <DeleteOutline />
              </button>
            </div>
          </footer>
        )}
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
