import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import {
  DeleteForever,
  DeleteOutline,
  DesignServices,
  WarningAmber,
} from "@mui/icons-material";
import styles from "./lesson_side_bar.module.scss";
import { TextField } from "@mui/material";
import { useAdminCreateLesson } from "@/api/lesson/useAdminCreateLesson";
import { useAdminDeleteLesson } from "@/api/lesson/useAdminDeleteLesson";
import { useAdminUpdateLesson } from "@/api/lesson/useAdminUpdateLesson";
import { useAdminCreateActivity } from "@/api/activity/useAdminCreateActivity";
import { useAdminDeleteActivity } from "@/api/activity/useAdminDeleteActivity";
import { useAdminTheme } from "@/api/theme/useAdminTheme";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { defaultLesson } from "@/lib/lesson/default_lesson";
import { useQueryClient } from "@tanstack/react-query";
import ILesson from "@/lib/lesson/lesson";
import IActivity from "@/lib/activity/activity";

interface ClientLesson {
  title: string;
  explanation: string;
}

export function LessonSideBar({
  isOpen,
  setIsOpen,
  hide,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hide: boolean;
}) {
  const { push, query } = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data: dbTheme } = useAdminTheme({ themeSlug: query.theme as string });
  const { mutateAsync: adminCreateLesson } = useAdminCreateLesson();
  const { mutateAsync: adminDeleteLesson } = useAdminDeleteLesson();
  const { mutateAsync: adminUpdateLesson } = useAdminUpdateLesson();
  const { mutateAsync: adminCreateActivity } = useAdminCreateActivity();
  const { mutateAsync: adminDeleteActivity } = useAdminDeleteActivity();

  // Get the active lesson index (1-based from query)
  const activeLessonIndex = query.ders ? parseInt(query.ders as string) - 1 : (dbTheme?.lessons.length ? 0 : null);
  const activeLesson = activeLessonIndex !== null && dbTheme?.lessons[activeLessonIndex]
    ? dbTheme.lessons[activeLessonIndex]
    : null;

  // Unified client lesson state
  const [clientLesson, setClientLesson] = useState<ClientLesson>({
    title: "",
    explanation: "",
  });

  // Initialize client lesson from database lesson
  useEffect(() => {
    if (activeLesson) {
      setClientLesson({
        title: activeLesson.title,
        explanation: activeLesson.explanation,
      });
    }
  }, [activeLesson]);

  // Check if lesson has been modified
  const isModified = useCallback(() => {
    if (!activeLesson) return false;

    return (
      activeLesson.title !== clientLesson.title ||
      activeLesson.explanation !== clientLesson.explanation
    );
  }, [activeLesson, clientLesson]);

  const reset = () => {
    if (activeLesson) {
      setClientLesson({
        title: activeLesson.title,
        explanation: activeLesson.explanation,
      });
    }
  };

  const save = useCallback(async () => {
    if (!activeLesson || !dbTheme) return;

    await adminUpdateLesson({
      themeSlug: dbTheme.slug,
      lesson: {
        _id: activeLesson._id,
        title: clientLesson.title,
        explanation: clientLesson.explanation,
      }
    });

    await queryClient.invalidateQueries({ queryKey: [`themes/${dbTheme.slug}`] });
  }, [adminUpdateLesson, activeLesson, clientLesson, dbTheme, queryClient]);

  const createActivity = useCallback(async () => {
    if (!activeLesson || !dbTheme) return;

    const newActivity: IActivity = {
      _id: "",
      title: "Yeni aktivite",
      explanation: "Aktivite açıklaması...",
      textContent: "",
      image: null,
      youtubeVideoUrl: null,
      audio: null,
      savedAt: Date.now(),
      type: "multiple-choice",
      exercise: {
        type: "multiple-choice-exercise",
        template: [],
        answers: []
      }
    };

    await adminCreateActivity({
      themeSlug: dbTheme.slug,
      lessonId: activeLesson._id,
      activity: newActivity
    });

    await queryClient.invalidateQueries({ queryKey: [`themes/${dbTheme.slug}`] });
  }, [adminCreateActivity, activeLesson, dbTheme, queryClient]);

  const deleteActivity = useCallback(async (activityId: string) => {
    if (!activeLesson || !dbTheme) return;

    await adminDeleteActivity({
      themeSlug: dbTheme.slug,
      lessonId: activeLesson._id,
      activityId
    });

    await queryClient.invalidateQueries({ queryKey: [`themes/${dbTheme.slug}`] });
  }, [adminDeleteActivity, activeLesson, dbTheme, queryClient]);

  const createLesson = useCallback(async () => {
    if (!dbTheme) return;

    await adminCreateLesson({
      themeSlug: dbTheme.slug,
      lesson: defaultLesson()
    });

    await queryClient.invalidateQueries({ queryKey: [`themes/${dbTheme.slug}`] });
  }, [adminCreateLesson, dbTheme, queryClient]);

  const deleteLesson = useCallback(async () => {
    if (!activeLesson || !dbTheme) return;

    await adminDeleteLesson({
      themeSlug: dbTheme.slug,
      lessonId: activeLesson._id
    });

    await queryClient.invalidateQueries({ queryKey: [`themes/${dbTheme.slug}`] });
    push(`/admin/temalar/${dbTheme.slug}`);
  }, [adminDeleteLesson, activeLesson, dbTheme, queryClient, push]);

  if (!dbTheme) return null;

  return (
    <aside className={`side-bar ${styles["lesson-side-bar"]}`}>
      <div
        className={`content`}
        style={{ display: isOpen ? undefined : "none" }}
      >
        <header>
          <h3 className="font-bold text-2xl">Ders Editörü</h3>
          <button onClick={createLesson} className="simple">
            Yeni ders ekle
          </button>
        </header>
        {activeLesson && (
          <div className="main">
            {isModified() && (
              <div className={"warning"}>
                <WarningAmber />
                <div className={"content"}>
                  <span>Kaydedilmemiş değişiklikler var.</span>
                  <div className={"actions text-black"}>
                    <button onClick={reset}>Geri al</button>
                    <button onClick={save}>Kaydet</button>
                  </div>
                </div>
              </div>
            )}
            <h2>Ders {(activeLessonIndex ?? 0) + 1}</h2>
            <div className="input-container">
              <label htmlFor="admin-lesson-title-input">Ders Adı</label>
              <TextField
                id="admin-lesson-title-input"
                size="small"
                placeholder="Ders 1..."
                value={clientLesson.title}
                onChange={(e) => setClientLesson(prev => ({ ...prev, title: e.target.value }))}
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
                value={clientLesson.explanation}
                onChange={(e) => setClientLesson(prev => ({ ...prev, explanation: e.target.value }))}
              />
            </div>
            <div className={`${styles["activity-list"]}`}>
              <header>
                <h3>Aktiviteler</h3>
              </header>
              <ol className={`simple`}>
                {activeLesson.activities.map(({ _id, title }) => (
                  <li key={_id}>
                    <div>
                      <p>{title}</p>
                      <div className={styles["group"]}>
                        <button
                          onClick={() =>
                            push(`${pathname}/${activeLesson._id}/${_id}`)
                          }
                          className="simple"
                        >
                          <DesignServices />
                        </button>
                        <button
                          onClick={() => deleteActivity(_id)}
                          className="simple error"
                        >
                          <DeleteForever />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <footer>
                <button onClick={createActivity} className="simple">
                  Yeni +
                </button>
              </footer>
            </div>
          </div>
        )}
        {activeLesson && (
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
        <span>Ders</span>
        <DesignServices />
      </button>
    </aside>
  );
}
