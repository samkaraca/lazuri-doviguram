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
import useViewModelContext from "@/features/activity_editor/view_model";
import {
  addNewQuestion,
  changeAnswer,
  changeQuestionText,
  removeQuestion,
} from "@/lib/exercises/se_service";
import { Testable } from "@/lib/types/testable";

export function PairTextsWithImagesExerciseForm() {
  const { simpleExercise, setSimpleExercise } = useViewModelContext()!;

  return (
    <div>
      <section
        aria-label="fotoğraf eşleştirme sorusu oluşturma formu"
        className={styles["container"]}
      >
        {simpleExercise.questions.map(({ id, answer, question }) => {
          return (
            <TextDroppableImageCard
              key={id}
              question={question}
              answer={answer}
              setAnswer={(newAnswer: string) =>
                setSimpleExercise((prev) => changeAnswer(id, newAnswer, prev))
              }
              setQuestion={(newQuestion: string) =>
                setSimpleExercise((prev) =>
                  changeQuestionText(id, newQuestion, prev)
                )
              }
              deleteItem={() =>
                setSimpleExercise((prev) => removeQuestion(id, prev))
              }
            />
          );
        })}
      </section>
      <Fab
        onClick={() =>
          setSimpleExercise((prev) => addNewQuestion(nanoid(), "", prev))
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
