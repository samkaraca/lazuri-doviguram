import { MediaTester } from "@/components/media_tester";
import styles from "./theme_side_bar.module.scss";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {
  DeleteOutline,
  DesignServices,
  Upload,
  WarningAmber,
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useAdminUpdateTheme } from "@/api/theme/useAdminUpdateTheme";
import { slugifyLaz } from "@/utils/slugify_laz";
import { useAdminTheme } from "@/api/theme/useAdminTheme";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminDeleteTheme } from "@/api/theme/useAdminDeleteTheme";
import { OptionalStringValueProperty } from "@/features/activity_editor/model/view_model";

interface ClientTheme {
  title: string;
  explanation: string;
  image: string | null;
  youtubeVideoUrl: OptionalStringValueProperty;
  imageFile: File | null;
}

export function ThemeSideBar({
  isOpen,
  setIsOpen,
  hide,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hide: boolean;
}) {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const { mutateAsync: adminUpdateTheme } = useAdminUpdateTheme();
  const { data: dbTheme } = useAdminTheme({ themeSlug: query.theme as string });
  const { mutateAsync: adminDeleteTheme } = useAdminDeleteTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Unified client theme state
  const [clientTheme, setClientTheme] = useState<ClientTheme>({
    title: "",
    explanation: "",
    image: null,
    youtubeVideoUrl: { status: "idle", value: "" },
    imageFile: null,
  });

  // Initialize client theme from database theme
  useEffect(() => {
    if (dbTheme) {
      setClientTheme({
        title: dbTheme.title,
        explanation: dbTheme.explanation,
        image: dbTheme.image ?? null,
        youtubeVideoUrl: { status: "success", value: dbTheme.youtubeVideoUrl ?? "" },
        imageFile: null,
      });
    }
  }, [dbTheme]);

  // Check if theme has been modified
  const isModified = useCallback(() => {
    if (!dbTheme) return false;

    return (
      dbTheme.title !== clientTheme.title ||
      dbTheme.explanation !== clientTheme.explanation ||
      dbTheme.image !== clientTheme.image ||
      (clientTheme.youtubeVideoUrl.status === "success" &&
        dbTheme.youtubeVideoUrl !== clientTheme.youtubeVideoUrl.value)
    );
  }, [dbTheme, clientTheme]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setClientTheme(prev => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setClientTheme(prev => ({
      ...prev,
      imageFile: null,
      image: null,
    }));
  };

  const reset = () => {
    if (dbTheme) {
      setClientTheme({
        title: dbTheme.title,
        explanation: dbTheme.explanation,
        image: dbTheme.image ?? null,
        youtubeVideoUrl: { status: "success", value: dbTheme.youtubeVideoUrl ?? "" },
        imageFile: null,
      });
    }
  };

  const save = useCallback(async () => {
    await adminUpdateTheme({
      oldThemeSlug: query.theme as string,
      theme: {
        slug: slugifyLaz(clientTheme.title),
        title: clientTheme.title,
        explanation: clientTheme.explanation,
        image: clientTheme.imageFile ?? (clientTheme.image === null ? null : undefined),
        youtubeVideoUrl: clientTheme.youtubeVideoUrl.status === "success" ? clientTheme.youtubeVideoUrl.value : undefined
      }
    });

    if (query.theme !== slugifyLaz(clientTheme.title)) {
      router.replace(`/admin/temalar/${slugifyLaz(clientTheme.title)}`);
    }
    await queryClient.invalidateQueries({ queryKey: [`themes/${slugifyLaz(clientTheme.title)}`] });
  }, [adminUpdateTheme, clientTheme, queryClient, query.theme, router]);

  const handleDeleteTheme = async () => {
    await adminDeleteTheme({ slug: query.theme as string });
    router.replace("/admin");
  };

  if (!dbTheme) return null;

  return (
    <>
      <aside className={`${styles["side-bar"]} side-bar`}>
        <div
          style={{ display: isOpen ? undefined : "none" }}
          className={`content`}
        >
          <header>
            <h3>Tema Editörü</h3>
          </header>
          <div className={"main"}>
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
            <div className="input-container">
              <label htmlFor="admin-theme-title-input">Tema Adı</label>
              <TextField
                id="admin-theme-title-input"
                size="small"
                placeholder="Çkuni Ocaği..."
                value={clientTheme.title}
                onChange={(e) => setClientTheme(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="input-container">
              <label htmlFor="admin-theme-explanation-input">
                Tema Açıklaması
              </label>
              <TextField
                id="admin-theme-explanation-input"
                multiline
                size="small"
                minRows={3}
                placeholder="Bu temada aile üyelerinin isimlerini öğreneceğiz..."
                value={clientTheme.explanation}
                onChange={(e) => setClientTheme(prev => ({ ...prev, explanation: e.target.value }))}
              />
            </div>

            <div className="input-container">
              <label>Tema Fotoğrafı</label>
              <div className="image-upload-container flex flex-col gap-4">
                <div className="image-preview relative">
                  <img
                    src={clientTheme.image ?? "/default-theme.jpg"}
                    alt="Theme preview"
                    className="object-contain w-full h-[256px]"
                  />
                  {clientTheme.image && (
                    <button
                      onClick={handleRemoveImage}
                      className="remove-image absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md transition-colors"
                      type="button"
                    >
                      <DeleteOutline className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<Upload />}
                  >
                    Fotoğraf seç
                  </Button>
                </div>
              </div>
            </div>
            <MediaTester
              label="Tema YouTube Video Linki"
              placeholder="https://www.youtube.com/watch?v=VQGLYY1Q8yA"
              media={clientTheme.youtubeVideoUrl}
              type="youtube-video"
              setMedia={(value) => setClientTheme(prev => ({ ...prev, youtubeVideoUrl: typeof value === 'function' ? value(prev.youtubeVideoUrl) : value }))}
            />
          </div>
          <footer>
            <div>
              <button onClick={handleDeleteTheme} className="simple error">
                <span>Temayı sil</span>
                <DeleteOutline />
              </button>
            </div>
          </footer>
        </div>
        <button
          style={{ transform: hide ? "translate(-100%, 0)" : undefined }}
          onClick={() => setIsOpen((prev) => !prev)}
          className={"open-close"}
        >
          <span>Tema</span>
          <DesignServices />
        </button>
      </aside>
    </>
  );
}
