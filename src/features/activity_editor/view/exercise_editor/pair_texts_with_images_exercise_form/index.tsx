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
import { Testable } from "@/lib/testable";
import * as AdminBEServices from "@/lib/exercise/qa_exercise/admin_qae_services";
import IQAExercise from "@/lib/exercise/qa_exercise/qa_exercise";

export function PairTextsWithImagesExerciseForm() {
  const viewModel = useViewModelContext()!;
  const { setExercise } = viewModel;
  const exercise = viewModel.exercise as IQAExercise;

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
