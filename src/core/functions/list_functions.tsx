type SetList<T> = (callback: (prev: T[]) => T[]) => void;

export function addItem<T>(setList: SetList<T>, newItem: T) {
  setList((prev) => [...prev, newItem]);
}

export function removeItem<T>(list: T[], setList: SetList<T>, item: T) {
  const newList = list.filter((itemId) => itemId !== item);
  setList((prev) => newList);
}
