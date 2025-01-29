import styles from "./theme_side_bar.module.scss";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {
  DeleteOutline,
  DesignServices,
  WarningAmber,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Button } from "@/components/ui/button"
import { useAdminUpdateTheme } from "@/api/theme/useAdminUpdateTheme";
import { slugifyLaz } from "@/utils/slugify_laz";
import { useAdminTheme } from "@/api/theme/useAdminTheme";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminDeleteTheme } from "@/api/theme/useAdminDeleteTheme";
import { useUploadImage } from "@/api/useUploadImage";
import { Loader2Icon, UploadCloudIcon, Trash2Icon, SquarePlayIcon } from "lucide-react";
import getYouTubeID from "get-youtube-id";
import { YouTubeEmbed } from "@next/third-parties/google"
import { Input } from "@/components/ui/input";

interface ClientTheme {
  title: string;
  explanation: string;
  image: string | null;
  youtubeVideoUrl: string | null;
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
  const uploadImageMutation = useUploadImage();

  // Unified client theme state
  const [clientTheme, setClientTheme] = useState<ClientTheme>({
    title: "",
    explanation: "",
    image: null,
    youtubeVideoUrl: null,
    imageFile: null,
  });

  // Initialize client theme from database theme
  useEffect(() => {
    if (dbTheme) {
      setClientTheme({
        title: dbTheme.title,
        explanation: dbTheme.explanation,
        image: dbTheme.image ?? null,
        youtubeVideoUrl: dbTheme.youtubeVideoUrl ?? null,
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
      (dbTheme.image && clientTheme.image && dbTheme.image !== clientTheme.image) ||
      (!dbTheme.image && clientTheme.image) ||
      (dbTheme.image && !clientTheme.image) ||
      (dbTheme.youtubeVideoUrl && clientTheme.youtubeVideoUrl && dbTheme.youtubeVideoUrl !== clientTheme.youtubeVideoUrl) ||
      (!dbTheme.youtubeVideoUrl && clientTheme.youtubeVideoUrl) ||
      (dbTheme.youtubeVideoUrl && !clientTheme.youtubeVideoUrl)

    );
  }, [dbTheme, clientTheme]);

  const handleImageUpload = (file: File) => {
    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        if (data.status === 'success') {
          setClientTheme(prev => ({ ...prev, image: data.data.url }));
        }
      },
    });
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
        youtubeVideoUrl: dbTheme.youtubeVideoUrl ?? null,
        imageFile: null,
      });
    }
  };

  const save = useCallback(async () => {
    const { status } = await adminUpdateTheme({
      oldThemeSlug: query.theme as string,
      theme: {
        slug: slugifyLaz(clientTheme.title),
        title: clientTheme.title,
        explanation: clientTheme.explanation,
        image: clientTheme.image || null,
        youtubeVideoUrl: clientTheme.youtubeVideoUrl || null
      }
    });

    if (status === "success" && query.theme !== slugifyLaz(clientTheme.title)) {
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
            <h3 className="font-bold text-2xl">Tema Editörü</h3>
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                />
                {!clientTheme.image && (
                  <button
                    className="rounded-md flex justify-center items-center gap-2 h-[256px] w-full bg-gray-200 hover:bg-gray-300"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadImageMutation.status === 'pending'}
                  >
                    {uploadImageMutation.status === 'pending' ? <div className="flex items-center gap-2"><Loader2Icon className="animate-spin" /> Fotoğraf yükleniyor...</div> : <div className="flex items-center gap-2"><UploadCloudIcon /> Fotoğraf Yükle</div>}
                  </button>
                )}
                {clientTheme.image && (
                  <div className="flex flex-col items-end relative">
                    <img src={clientTheme.image} alt="Theme preview" className="rounded-md w-full h-[256px] object-contain bg-gray-200" />
                    <Button variant="destructive" size="icon" onClick={handleRemoveImage} className="absolute top-1 right-1">
                      <Trash2Icon />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <section>
              <div className="border border-2 border-gray-200 rounded-md overflow-hidden">
                {clientTheme.youtubeVideoUrl ? <YouTubeEmbed
                  videoid={getYouTubeID(clientTheme.youtubeVideoUrl) ?? ""}
                /> : <div className="flex items-center gap-2 w-full justify-center aspect-video !bg-gray-200"><SquarePlayIcon />Youtube videosu ekleyin</div>}
              </div>
              <Input placeholder="Youtube video linki..." className="mt-2" value={clientTheme.youtubeVideoUrl ?? ""} onChange={(e) => setClientTheme(x => ({ ...x, youtubeVideoUrl: e.target.value }))} />
            </section>
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
