export interface StatusResponse<DataType = any> {
  status: "error" | "success" | "warning" | "info";
  message: string;
  data?: DataType;
}
