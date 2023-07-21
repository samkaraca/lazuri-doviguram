export interface StatusResponse {
  status: "error" | "success" | "warning" | "info";
  message: string;
  data?: any;
}
