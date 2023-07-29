import { Item } from "./item";

export class Blank {
  constructor(
    readonly id: string,
    readonly answer: string,
    readonly item: Item | null
  ) {}

  static from(obj: Blank) {
    return new Blank(obj.id, obj.answer, obj.item);
  }

  static empty(obj: Blank) {
    return new Blank(obj.id, obj.answer, null);
  }

  static fill(obj: Blank, item: Item) {
    return new Blank(obj.id, obj.answer, item);
  }
}
