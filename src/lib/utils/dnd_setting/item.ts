export class Item {
  constructor(readonly id: string, readonly value: string) {}

  static from(obj: Item) {
    return new Item(obj.id, obj.value);
  }
}
