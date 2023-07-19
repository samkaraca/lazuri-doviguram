import { IViewModel } from "@/features/activity_editor/model/view_model";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FillInBlanksQuestion } from "@/core/models/entities/question";

export function TypeInBlanksExercise({
  replies,
  setReplies,
  isFormLocked,
  exercise,
}: {
  replies: { [index: number]: string }[];
  setReplies: Dispatch<SetStateAction<{ [index: number]: string }[]>>;
  isFormLocked: boolean;
  exercise: FillInBlanksQuestion[];
}) {
  return (
    <ol className={`simple composite-question-list`}>
      {exercise.map((item, index) => {
        return (
          <li key={index}>
            <section aria-label="soru">
              {Array.from(item.parsed, ([pieceKey, pieceValue], i) => {
                if (i % 2 === 0) {
                  return <p key={pieceKey}>{pieceValue}</p>;
                }

                const reply = replies[index][i];
                const isCorrect =
                  reply !== undefined && reply !== null
                    ? item.check(pieceKey, reply)
                    : false;

                return (
                  <input
                    type="text"
                    className={`basic ${
                      isFormLocked ? (isCorrect ? "success" : "error") : ""
                    }`}
                    key={pieceKey}
                    disabled={isFormLocked}
                    value={replies[index][i]}
                    onChange={(e) => {
                      setReplies((prev) => {
                        const newReplies = [...prev];
                        newReplies[index][i] = e.target.value;
                        return newReplies;
                      });
                    }}
                  />
                );
              })}
            </section>
          </li>
        );
      })}
    </ol>
  );
}
