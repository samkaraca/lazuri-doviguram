import IMultipleChoiceExercise from "@/lib/exercise/multiple_choice_exercise/multiple_choice_exercise";
import activityStyles from "../../activity.module.scss";
import useViewModelContext from "../../view_model";
import * as ExerciseServices from "@/lib/exercise/exercise_services";

export function MultipleChoiceExercise() {
  const { activityData, replies, isSolved, setReplies } =
    useViewModelContext()!;

  if (!replies) return null;

  return (
    <article>
      <div className={activityStyles["exercise-body"]}>
        <ol className={`simple multiple-choice`}>
          {(activityData.exercise as IMultipleChoiceExercise).template.map(
            ({ id, questionText, choices }, index) => {
              const reply = ExerciseServices.getReply(id, replies);
              const isCorrect = ExerciseServices.checkReply(
                id,
                activityData.exercise,
                replies
              );

              return (
                <li
                  key={id}
                  className={`${
                    isSolved ? (isCorrect ? "success" : "error") : ""
                  }`}
                >
                  <section aria-label="soru">
                    <p>{questionText}</p>
                    <div className={"choices"}>
                      {choices.map((choice, i) => {
                        return (
                          <div key={`${choice}-${i}`} className={"choice"}>
                            <input
                              disabled={isSolved}
                              onChange={() =>
                                setReplies(
                                  ExerciseServices.reply(
                                    id,
                                    i.toString(),
                                    replies
                                  )
                                )
                              }
                              checked={reply && reply.value === i.toString()}
                              type="radio"
                              id={`choice-${index}-${i}`}
                              name={`choice-${index}`}
                            />
                            <label htmlFor={`choice-${index}-${i}`}>
                              {choice}
                            </label>
                          </div>
                        );
                      })}
                    </div>
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
