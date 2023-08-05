export default interface IFillInBlanksExerciseUnit {
  id: string;
  atoms: (
    | { id: string; type: "text"; value: string }
    | { id: string; type: "blank" }
  )[];
}
