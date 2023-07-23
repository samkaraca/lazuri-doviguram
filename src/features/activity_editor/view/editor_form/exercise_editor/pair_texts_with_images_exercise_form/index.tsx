import styles from "./styles.module.scss";
import {
  Add,
  AddPhotoAlternate,
  Clear,
  PhotoLibraryOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { nanoid } from "nanoid";
import { SimpleQuestion } from "@/core/models/entities/question";
import { Fab } from "@mui/material";
import { AltEditDialog } from "@/features/edit_dialog/index.alt";
import { Testable } from "@/core/models/entities/testable";
import useViewModelContext from "@/features/activity_editor/view_model";

interface ImageCard {
  question: string;
  answer: string;
}

export function PairTextsWithImagesExerciseForm() {
  const { simpleExercise, setSimpleExercise } = useViewModelContext()!;

  return (
    <div>
      <section
        aria-label="fotoğraf eşleştirme sorusu oluşturma formu"
        className={styles["container"]}
      >
        {Array.from(simpleExercise, ([key, item]) => {
          const { question, answer } = item;

          return (
            <TextDroppableImageCard
              key={key}
              question={question}
              answer={answer}
              setAnswer={(newAnswer: string) =>
                setSimpleExercise((prev) => {
                  const newExercise = new Map(prev);
                  newExercise.set(
                    key,
                    new SimpleQuestion(prev.get(key)!.question, newAnswer)
                  );
                  return newExercise;
                })
              }
              setQuestion={(newQuestion: string) =>
                setSimpleExercise((prev) => {
                  const newExercise = new Map(prev);
                  newExercise.set(
                    key,
                    new SimpleQuestion(newQuestion, prev.get(key)!.answer)
                  );
                  return newExercise;
                })
              }
              deleteItem={() => {
                setSimpleExercise((prev) => {
                  const newExercise = new Map(prev);
                  newExercise.delete(key);
                  return newExercise;
                });
              }}
            />
          );
        })}
      </section>
      <Fab
        onClick={() => {
          setSimpleExercise((prev) => {
            const newExercise = new Map(prev);
            newExercise.set(nanoid(), new SimpleQuestion("", ""));
            return newExercise;
          });
        }}
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

  return (
    <>
      <div className={`simple-card ${styles["question-card"]}`}>
        {question && (
          <img
            alt="soru fotoğrafı"
            src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${question}`}
          />
        )}
        {!question && (
          <button
            className={`add ${styles["add-photo"]}`}
            onClick={() => setIsOpen(true)}
          >
            <AddPhotoAlternate />
          </button>
        )}
        <input
          className={`simple`}
          type="text"
          placeholder="cevap..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div
          className={`${styles["action-buttons"]} ${
            styles[question ? "double" : "single"]
          }`}
        >
          <button className="simple-svg remove" onClick={deleteItem}>
            <Clear />
          </button>
          {question && (
            <button className="simple-svg" onClick={() => setIsOpen(true)}>
              <PhotoLibraryOutlined />
            </button>
          )}
        </div>
      </div>
      <AltEditDialog
        type="image"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Soru resmi"
        placeholder="resim ismi..."
        content={content}
        setContent={setContent}
        saveContent={() => {
          setIsOpen(false);
          setQuestion(content.value);
        }}
      />
    </>
  );
}
