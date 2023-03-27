import { Dispatch, SetStateAction } from "react";

export default function livingStateOf<T>(
  setState: Dispatch<SetStateAction<T>>
) {
  let state;
  setState((prev) => {
    state = prev;
    return prev;
  });
  return state;
}
