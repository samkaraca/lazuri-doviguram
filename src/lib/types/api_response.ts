export interface ApiResponse<DataType = any> {
  status: "error" | "success" | "warning" | "info";
  message: string;
  data?: DataType;
}
