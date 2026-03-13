/**
 * Centralized error handling utilities
 */

export const ErrorCode = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  SERVICE_WORKER_ERROR: 'SERVICE_WORKER_ERROR',
  FORM_SUBMISSION_ERROR: 'FORM_SUBMISSION_ERROR',
  MODULE_LOAD_ERROR: 'MODULE_LOAD_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export class AppError extends Error {
  public code: ErrorCode;
  public userMessage?: string;

  constructor(code: ErrorCode, message: string, userMessage?: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessage;
  }
}

export function createErrorHandler(context: string) {
  return (error: unknown, userMessage?: string) => {
    console.error(`[${context}] Error:`, error);

    if (error instanceof AppError) {
      return error.userMessage || userMessage || 'An unexpected error occurred';
    }

    if (error instanceof Error) {
      return userMessage || 'Something went wrong. Please try again.';
    }

    return userMessage || 'An unexpected error occurred';
  };
}
