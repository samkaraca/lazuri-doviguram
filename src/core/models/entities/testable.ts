export interface Testable {
  value: string;
  status: "error" | "success" | "idle" | "loading";
}
