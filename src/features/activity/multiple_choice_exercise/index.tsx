import { MultipleChoiceQuestion } from "@/core/models/entities/question";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useState } from "react";

export function MultipleChoiceExercise({
  isFormLocked,
  exercise,
  replies,
  setReplies,
}: {
  isFormLocked: boolean;
  exercise: MultipleChoiceQuestion[];
  replies: number[];
  setReplies: Dispatch<SetStateAction<number[]>>;
}) {
  return (
    <ol className={`simple multiple-choice`}>
      {exercise.map((item, index) => {
        const { question, choices } = item;
        const reply = replies[index];
        const isCorrect =
          reply !== undefined && reply !== null ? item.check(reply) : false;

        return (
          <li
            key={index}
            className={`${
              isFormLocked ? (isCorrect ? "success" : "error") : ""
            }`}
          >
            <section aria-label="soru">
              <p>{question}</p>
              <div className={"choices"}>
                {choices.map((choice, i) => {
                  return (
                    <div key={`${choice}-${i}`} className={"choice"}>
                      <input
                        disabled={isFormLocked}
                        onChange={() =>
                          setReplies((prev) => {
                            const newReplies = [...prev];
                            newReplies[index] = i;
                            return newReplies;
                          })
                        }
                        checked={replies[index] === i}
                        type="radio"
                        id={`choice-${index}-${i}`}
                        name={`choice-${index}`}
                      />
                      <label htmlFor={`choice-${index}-${i}`}>{choice}</label>
                    </div>
                  );
                })}
              </div>
            </section>
          </li>
        );
      })}
    </ol>
  );
}
