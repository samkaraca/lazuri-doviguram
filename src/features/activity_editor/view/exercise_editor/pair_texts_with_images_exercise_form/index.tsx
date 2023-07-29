import styles from "./styles.module.scss";
import {
  Add,
  AddPhotoAlternate,
  Clear,
  PhotoLibraryOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Fab } from "@mui/material";
import { AltEditDialog } from "@/features/edit_dialog/index.alt";
import { Testable } from "@/core/models/entities/testable";
import useViewModelContext from "@/features/activity_editor/view_model";
import {
  SimpleExercise,
  SimpleQuestion,
} from "@/lib/exercises/simple_question_exercise";

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
        {simpleExercise.questions.map(({ id, answer, question, reply }) => {
          return (
            <TextDroppableImageCard
              key={id}
              question={question}
              answer={answer}
              setAnswer={(newAnswer: string) =>
                setSimpleExercise((prev) => {
                  const newQuestions = prev.questions.map((q) => {
                    if (q.id !== id) return SimpleQuestion.from(q);
                    return new SimpleQuestion(
                      q.id,
                      q.question,
                      newAnswer,
                      q.reply
                    );
                  });
                  return new SimpleExercise(prev.activityId, newQuestions);
                })
              }
              setQuestion={(newQuestion: string) =>
                setSimpleExercise((prev) => {
                  const newQuestions = prev.questions.map((q) => {
                    if (q.id !== id) return SimpleQuestion.from(q);
                    return new SimpleQuestion(
                      q.id,
                      newQuestion,
                      q.answer,
                      q.reply
                    );
                  });
                  return new SimpleExercise(prev.activityId, newQuestions);
                })
              }
              deleteItem={() => {
                setSimpleExercise((prev) => {
                  const newQuestions = prev.questions.filter(
                    (q) => q.id !== id
                  );
                  return new SimpleExercise(prev.activityId, newQuestions);
                });
              }}
            />
          );
        })}
      </section>
      <Fab
        onClick={() => {
          setSimpleExercise((prev) => {
            const newQuestions = [
              ...prev.questions,
              new SimpleQuestion(nanoid(), "", "", null),
            ];
            return new SimpleExercise(prev.activityId, newQuestions);
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
