import { Theme, ThemeLevel } from "./theme";

export class IDialog implements Omit<Theme, "image" | "level" | "code"> {
  readonly isOpen: boolean;
  readonly title: string;
  readonly description: string;
  readonly image: File | null;
  readonly level: ThemeLevel | undefined;

  constructor(dialog: Partial<IDialog>) {
    this.isOpen = dialog.isOpen ?? false;
    this.title = dialog.title ?? "";
    this.description = dialog.description ?? "";
    this.image = dialog.image ?? null;
    this.level = dialog.level ?? undefined;
  }

  open = () => this.renewWith("isOpen", true);

  close = () => this.renewWith("isOpen", false);

  renewWith<T extends keyof IDialog>(
    property: T,
    newValue: IDialog[T]
  ): IDialog {
    return new IDialog({ ...this, [property]: newValue });
  }
}
