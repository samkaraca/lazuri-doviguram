import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./styles.module.scss";
import useViewModelContext from "../view_model";
import { MediaTester } from "@/components/media_tester";
import YouTube from "react-youtube";
import { NextImageContainer } from "@/components/next_image_container";
import getYouTubeID from "get-youtube-id";
import ExerciseEditor from "./exercise_editor";
import IActivity from "@/lib/activity/activity";
import { useUploadSound } from "@/api/useUploadSound";
import { useRef } from "react";
import { useUploadImage } from "@/api/useUploadImage";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const activityTypeMap = {
  "true-false": "Doğru yanlış",
  "type-in-blanks": "Boşluk doldurma",
  "drag-into-blanks": "Boşluğa sürükleme",
  "multiple-choice": "Çoktan seçmeli",
  "pair-texts-with-images": "Resimle eşleştirme",
};

export default function EditorForm() {
  const {
    title,
    setTitle,
    explanation,
    setExplanation,
    textContent,
    setTextContent,
    youtubeVideoUrl,
    setYoutubeVideoUrl,
    audio,
    setAudio,
    image,
    setImage,
    type,
    changeActivityType,
  } = useViewModelContext()!;

  const uploadSoundMutation = useUploadSound();
  const uploadImageMutation = useUploadImage();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);

  const handleSoundUpload = (file: File) => {
    uploadSoundMutation.mutate(file, {
      onSuccess: (data) => {
        if (data.status === 'success') {
          setAudio(data.data.url);
        } else {
          setAudio("");
        }
      },
      onError: () => {
        setAudio("");
      },
    });
  };

  const handleRemoveAudio = () => {
    setAudio("");
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };

  const handleImageUpload = (file: File) => {
    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        if (data.status === 'success') {
          setImage(data.data.url);
        } else {
          setImage("");
        }
      },
      onError: () => {
        setImage("");
      },
    });
  };

  const handleRemoveImage = () => {
    setImage("");
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  return (
    <div
      className={`${styles["simple-container"]} ${styles["editing-form-container"]}`}
    >
      <FormControl>
        <InputLabel id="activity-type-select-label">Aktivite türü</InputLabel>
        <Select
          value={type}
          onChange={(e) =>
            changeActivityType(e.target.value as IActivity["type"])
          }
          label="Aktivite türü"
          labelId="activity-type-select-label"
        >
          {Object.keys(activityTypeMap).map((code) => {
            return (
              <MenuItem key={code} value={code}>
                {activityTypeMap[code as keyof typeof activityTypeMap]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className="input-container" aria-label="başlık">
        <label htmlFor="editor-form-activity-title">Başlık</label>
        <input
          className="simple"
          type="text"
          id="editor-form-activity-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-container" aria-label="açıklama">
        <label htmlFor="editor-form-activity-explanation">Açıklama</label>
        <input
          className="simple"
          type="text"
          id="editor-form-activity-explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>
      <section aria-label="youtube video linki">
        {(youtubeVideoUrl.status === "loading" ||
          youtubeVideoUrl.status === "success") && (
            <YouTube
              style={{
                visibility: "hidden",
                height: 0,
              }}
              videoId={
                getYouTubeID(youtubeVideoUrl.value) ??
                (() => {
                  setYoutubeVideoUrl((prev) => ({ ...prev, status: "error" }));
                  return undefined;
                })()
              }
              onError={() =>
                setYoutubeVideoUrl((prev) => ({ ...prev, status: "error" }))
              }
              onReady={(r) =>
                r.target.videoTitle
                  ? setYoutubeVideoUrl((prev) => ({ ...prev, status: "success" }))
                  : setYoutubeVideoUrl((prev) => ({ ...prev, status: "error" }))
              }
            />
          )}
        <MediaTester
          label="Youtube Video URL"
          placeholder="https://youtu.be/5UdYesdXFco"
          media={youtubeVideoUrl}
          setMedia={setYoutubeVideoUrl}
        />
      </section>
      <section aria-label="fotoğraf ismi">
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file);
            }
          }}
        />
        {!image && (
          <button
            className="rounded-md flex justify-center items-center gap-2 h-[256px] w-full bg-gray-200 hover:bg-gray-300"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploadImageMutation.status === 'pending'}
          >
            {uploadImageMutation.status === 'pending' ? <div className="flex items-center gap-2"><Loader2Icon className="animate-spin" /> Fotoğraf yükleniyor...</div> : <div className="flex items-center gap-2"><UploadCloudIcon /> Fotoğraf Yükle</div>}
          </button>
        )}
        {image && (
          <div className="flex flex-col items-end relative">
            <img src={image} alt="fotoğraf ismi" onError={() => setImage("")} className="rounded-md w-full h-[256px] object-contain bg-gray-200" />
            <Button variant="destructive" size="icon" onClick={handleRemoveImage} className="absolute top-1 right-1">
              <Trash2Icon />
            </Button>
          </div>
        )}
      </section>
      <div className="input-container" aria-label="başlık">
        <label htmlFor="editor-form-activity-content">İçerik</label>
        <Textarea
          className="simple"
          id="editor-form-activity-content"
          value={textContent}
          rows={5}
          onChange={(e) => setTextContent(e.target.value)}
        />
      </div>
      <section aria-label="ses dosyası ismi">
        <input
          type="file"
          accept="audio/*"
          ref={audioInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleSoundUpload(file);
            }
          }}
        />
        {!audio && (
          <button
            className="rounded-md flex items-center gap-2 p-4 w-full bg-gray-200 hover:bg-gray-300"
            onClick={() => audioInputRef.current?.click()}
            disabled={uploadSoundMutation.status === 'pending'}
          >
            {uploadSoundMutation.status === 'pending' ? <div className="flex items-center gap-2"><Loader2Icon className="animate-spin" /> Ses yükleniyor...</div> : <div className="flex items-center gap-2"><UploadCloudIcon /> Ses Yükle</div>}
          </button>
        )}
        {audio && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <audio
              src={audio}
              className="flex-1"
              onError={() => setAudio("")}
              controls
            />
            <button onClick={handleRemoveAudio} style={{ marginLeft: '10px' }}>
              Sesi Kaldır
            </button>
          </div>
        )}
      </section>
      <ExerciseEditor />
    </div>
  );
}
