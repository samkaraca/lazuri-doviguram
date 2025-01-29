import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Input } from "@/components/ui/input";
import styles from "./styles.module.scss";
import useViewModelContext from "../view_model";
import getYouTubeID from "get-youtube-id";
import ExerciseEditor from "./exercise_editor";
import IActivity from "@/lib/activity/activity";
import { useUploadSound } from "@/api/useUploadSound";
import { useRef } from "react";
import { useUploadImage } from "@/api/useUploadImage";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SquarePlayIcon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
      className={`w-[46%] max-w-[60em] min-w-[22em] bg-white px-4 py-6 pb-10 flex flex-col divide-y space-y-4 divide-gray-200`}
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
      <div className="pt-4 flex flex-col gap-2" aria-label="başlık">
        <Label htmlFor="editor-form-activity-title">Başlık</Label>
        <Input
          type="text"
          id="editor-form-activity-title"
          value={title}
          className="w-full !text-lg h-10"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="pt-4 flex flex-col gap-2" aria-label="açıklama">
        <Label htmlFor="editor-form-activity-explanation">Açıklama</Label>
        <Input
          type="text"
          id="editor-form-activity-explanation"
          value={explanation}
          className="w-full !text-lg h-10"
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>
      <section className="pt-4 flex flex-col gap-1">
        <Label htmlFor="editor-form-activity-youtube">Youtube video</Label>
        <div className="border border-2 border-gray-200 rounded-md overflow-hidden">
          {youtubeVideoUrl ? <YouTubeEmbed
            videoid={getYouTubeID(youtubeVideoUrl) ?? ""}
          /> : <div className="flex items-center gap-2 w-full justify-center aspect-video !bg-gray-200"><SquarePlayIcon />Youtube videosu ekleyin</div>}
        </div>
        <Input placeholder="Youtube video linki..." className="mt-2" value={youtubeVideoUrl} onChange={(e) => setYoutubeVideoUrl(e.target.value)} />
      </section>
      <section className="pt-4 flex flex-col gap-2" aria-label="fotoğraf ismi">
        <Label htmlFor="editor-form-activity-image">Fotoğraf</Label>
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
      <div className="pt-4 flex flex-col gap-2" aria-label="başlık">
        <Label htmlFor="editor-form-activity-content">İçerik</Label>
        <Textarea
          className="simple"
          id="editor-form-activity-content"
          value={textContent}
          rows={5}
          onChange={(e) => setTextContent(e.target.value)}
        />
      </div>
      <section className="pt-4 flex flex-col gap-2" aria-label="ses dosyası ismi">
        <Label htmlFor="editor-form-activity-audio">Ses dosyası</Label>
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
          <div className="flex items-center">
            <audio
              src={audio}
              className="flex-1"
              onError={() => setAudio("")}
              controls
            />
            <button onClick={handleRemoveAudio} className="ml-2">
              Sesi Kaldır
            </button>
          </div>
        )}
      </section>
      <Separator />
      <ExerciseEditor />
    </div>
  );
}
