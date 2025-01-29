import styles from "./styles.module.scss";
import {
  Add,
  Clear,
} from "@mui/icons-material";
import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { Fab } from "@mui/material";
import { Button } from "@/components/ui/button";
import useViewModelContext from "@/features/activity_editor/view_model";
import { Testable } from "@/lib/testable";
import * as AdminBEServices from "@/lib/exercise/qa_exercise/admin_qae_services";
import IQAExercise from "@/lib/exercise/qa_exercise/qa_exercise";
import { useUploadImage } from "@/api/useUploadImage";
import { Loader2Icon, UploadCloudIcon, Trash2Icon } from "lucide-react";

export function PairTextsWithImagesExerciseForm() {
  const viewModel = useViewModelContext()!;
  const { setExercise } = viewModel;
  const exercise = viewModel.exercise as IQAExercise;

  const uploadImageMutation = useUploadImage();

  const handleImageUpload = (file: File, setQuestion: (newQuestion: string) => void) => {
    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        if (data.status === 'success') {
          setQuestion(data.data.url);
        }
      },
    });
  };

  return (
    <div>
      <section
        aria-label="fotoğraf eşleştirme sorusu oluşturma formu"
        className={styles["container"]}
      >
        {exercise.template.map(({ id, questionText }) => {
          const answer = exercise.answers.find((a) => a.id === id);

          return (
            <TextDroppableImageCard
              key={id}
              question={questionText}
              answer={answer?.value ?? ""}
              setAnswer={(newAnswer: string) =>
                setExercise((prev) =>
                  AdminBEServices.changeAnswer(id, newAnswer, prev as any)
                )
              }
              setQuestion={(newQuestion: string) =>
                setExercise((prev) =>
                  AdminBEServices.changeQuestionText(
                    id,
                    newQuestion,
                    prev as any
                  )
                )
              }
              deleteItem={() =>
                setExercise((prev) =>
                  AdminBEServices.removeQuestion(id, prev as any)
                )
              }
            />
          );
        })}
      </section>
      <Fab
        onClick={() =>
          setExercise((prev) =>
            AdminBEServices.addNewQuestion(nanoid(), "", "", prev as any)
          )
        }
        color="secondary"
        size="small"
        sx={{
          position: "absolute",
          bottom: "-1.4rem",
          right: "0",
          left: "0",
          margin: "0 auto",
        }}
      >
        <Add />
      </Fab>
    </div>
  );
}

function TextDroppableImageCard({
  question,
  answer,
  setQuestion,
  setAnswer,
  deleteItem,
}: {
  question: string;
  answer: string;
  setQuestion: (newQuestion: string) => void;
  setAnswer: (newAnswer: string) => void;
  deleteItem: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<Testable>({
    value: "",
    status: "idle",
  });

  const uploadImageMutation = useUploadImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (file: File, setQuestion: (newQuestion: string) => void) => {
    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        if (data.status === 'success') {
          setQuestion(data.data.url);
        }
      },
    });
  };

  return (
    <>
      <div className={`simple-card ${styles["question-card"]}`}>
        {question && (
          <img
            alt="soru fotoğrafı"
            src={question}
            className="rounded-md w-full object-contain bg-gray-200"
          />
        )}
        {!question && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload(file, setQuestion);
                }
              }}
            />
            <button
              className="rounded-md flex justify-center items-center gap-2 h-[156px] w-full bg-gray-200 hover:bg-gray-300"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadImageMutation.status === 'pending'}
            >
              {uploadImageMutation.status === 'pending' ? <div className="flex items-center gap-2"><Loader2Icon className="animate-spin" /> Fotoğraf yükleniyor...</div> : <div className="flex items-center gap-2"><UploadCloudIcon /> Fotoğraf Yükle</div>}
            </button>
          </>
        )}
        <input
          className={`simple`}
          type="text"
          placeholder="cevap..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div
          className={`${styles["action-buttons"]} ${styles[question ? "double" : "single"]}`}
        >
          <Button size="icon" variant="destructive" onClick={deleteItem}>
            <Clear />
          </Button>
          {question && (
            <Button size="icon" variant="secondary" onClick={() => setQuestion("")}>
              <Trash2Icon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
