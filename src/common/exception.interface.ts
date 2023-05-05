export interface ExceptionInterface {
  statusCode: number;
  message: string | null;
  error: string | Record<string, unknown> | null;
}
