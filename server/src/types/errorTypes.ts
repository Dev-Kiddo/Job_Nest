export interface CustomError {
  message: string;
  statusCode?: number;
  path?: string;
  name?: string;
  stack: string;
}
