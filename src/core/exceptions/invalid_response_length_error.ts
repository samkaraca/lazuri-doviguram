import { CustomError } from "./custom_error";

export class InvalidResponseLengthError extends CustomError {
  constructor(public expectedLength: number, public actualLength: number) {
    super(
      `Invalid response length. Expected ${expectedLength} responses, but received ${actualLength}.`
    );
    this.name = "InvalidResponseLengthError";
    this.expectedLength = expectedLength;
    this.actualLength = actualLength;
  }
}
