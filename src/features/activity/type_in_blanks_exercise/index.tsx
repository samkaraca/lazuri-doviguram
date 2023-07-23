import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FillInBlanksQuestion } from "@/core/models/entities/question";

export function TypeInBlanksExercise({
  replies,
  setReplies,
  isFormLocked,
  exercise,
}: {
  replies: Map<string, string>[];
  setReplies: Dispatch<SetStateAction<Map<string, string>[]>>;
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

                const replyMap = replies[index] as
                  | Map<string, string>
                  | undefined;
                const reply = replyMap?.get(pieceKey);
                const isCorrect =
                  reply !== undefined && reply !== null
                    ? item.check(pieceKey, reply)
                    : false;

                return (
                  <input
                    type="text"
                    style={{ width: "10rem" }}
                    className={`basic ${
                      isFormLocked ? (isCorrect ? "success" : "error") : ""
                    }`}
                    key={pieceKey}
                    disabled={isFormLocked}
                    value={replyMap?.get(pieceKey) ?? ""}
                    onChange={(e) => {
                      setReplies((prev) => {
                        const newReplies = [...prev];
                        const newReplyMap = new Map(
                          newReplies[index] ?? new Map()
                        );
                        newReplyMap.set(pieceKey, e.target.value);
                        newReplies[index] = newReplyMap;
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
