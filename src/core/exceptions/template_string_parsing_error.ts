import { CustomError } from "./custom_error";

export class TemplateStringParsingError extends CustomError {
  constructor(public inputString: string) {
    super(`Failed to parse the template string: '${inputString}'.`);
    this.name = "TemplateStringParsingError";
    this.inputString = inputString;
  }
}
