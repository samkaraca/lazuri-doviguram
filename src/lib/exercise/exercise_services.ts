import IExercise from "./exercise";
import ILocalExerciseData from "./local_exercise_data";
import IReply from "./reply";

export function getGrade(exercise: IExercise, replies: IReply[]): number {
  if (exercise.answers.length !== replies.length) {
    throw Error(
      "Answer and user reply counts don't match. ExerciseServices -> grade."
    );
  }
  if (exercise.answers.length === 0) {
    return 100;
  }

  let correct = 0;
  exercise.answers.forEach((a) => {
    const reply = replies.find((r) => r.id === a.id);
    if (!reply) {
      throw Error(
        "Replies and answers list don't match. ExerciseServices -> grade."
      );
    }
    if (reply.value === a.value) {
      correct++;
    }
  });
  return Math.round((correct / exercise.answers.length) * 100);
}

export function reply(
  atomId: string,
  reply: IReply["value"],
  replies: IReply[]
): IReply[] {
  const rp = replies.find((r) => r.id === atomId);
  if (!rp) {
    throw Error("There is no such answer. ExerciseServices -> reply.");
  }
  return replies.map((r) => {
    if (r.id !== atomId) return r;
    return { id: r.id, value: reply };
  });
}

export function getRepliesTemplate(exercise: IExercise): IReply[] {
  return exercise.answers.map((a) => ({ id: a.id, value: null }));
}

export function saveLocally(activityId: string, localData: ILocalExerciseData) {
  localStorage.setItem(activityId, JSON.stringify(localData));
}

export function getLocalData(
  activityId: string
): ILocalExerciseData | undefined {
  const localData = localStorage.getItem(activityId);
  if (localData) {
    return JSON.parse(localData);
  }
}

/**
 * Checks the local storage for the activity with @param activityId. 
 * If it exists and has been solved before, returns the replies from local storage.
 * Otherwise, returns an empty  replies template.
 */
export function getUltimateReplies(
  activityId: string,
  activitySavedAt: number,
  exercise: IExercise
): { replies: IReply[]; beenSolved: boolean } {
  const localData = getLocalData(activityId);
  // If the activity has been solved before but it has been updated since then, reset the local data.
  const localDataValid = localData && localData.savedAt > activitySavedAt;
  if (localDataValid && localData.replies) {
    return { replies: localData.replies, beenSolved: true };
  }
  return { replies: getRepliesTemplate(exercise), beenSolved: false };
}

export function getReply(
  atomId: string,
  replies: IReply[]
): IReply | undefined {
  const reply = replies.find((r) => r.id === atomId);
  if (reply) return { ...reply };
}

export function checkReply(
  atomId: string,
  exercise: IExercise,
  replies: IReply[]
): boolean {
  const answer = exercise.answers.find((a) => a.id === atomId);
  const reply = replies.find((r) => r.id === atomId);
  if (!reply || !answer || reply.value === null) return false;
  return answer.value === reply.value;
}
