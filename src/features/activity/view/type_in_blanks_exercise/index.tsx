import IFillInBlanksExercise from "@/lib/exercise/fill_in_blanks_exercise/fill_in_blanks_exercise";
import activityStyles from "../../activity.module.scss";
import useViewModelContext from "../../view_model";
import * as ExerciseServices from "@/lib/exercise/exercise_services";

export function TypeInBlanksExercise() {
  const { activityData, replies, isSolved, setReplies } =
    useViewModelContext()!;

  if (!replies) return null;

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple composite-question-list`}>
          {(activityData.exercise as IFillInBlanksExercise).template.map(
            (item, index) => {
              return (
                <li key={index}>
                  <section aria-label="soru">
                    {item.atoms.map((piece) => {
                      const { id, type } = piece;

                      if (type === "text") {
                        return (
                          <p
                            key={id}
                            dangerouslySetInnerHTML={{ __html: piece.value }}
                          />
                        );
                      }

                      const reply = ExerciseServices.getReply(id, replies);
                      const isCorrect = ExerciseServices.checkReply(
                        id,
                        activityData.exercise,
                        replies
                      );

                      return (
                        <input
                          type="text"
                          style={{ width: "10rem" }}
                          className={`basic ${
                            isSolved ? (isCorrect ? "success" : "error") : ""
                          }`}
                          key={id}
                          disabled={isSolved}
                          value={reply?.value ?? ""}
                          onChange={(e) =>
                            setReplies(
                              ExerciseServices.reply(
                                id,
                                e.target.value,
                                replies
                              )
                            )
                          }
                        />
                      );
                    })}
                  </section>
                </li>
              );
            }
          )}
        </ol>
      </div>
    </article>
  );
}
