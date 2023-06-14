import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-hot-toast";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).message === "string"
  );
}

export function toastError(err: unknown) {
  if (isFetchBaseQueryError(err)) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg =
      "error" in err
        ? err.status === "FETCH_ERROR"
          ? "Server error"
          : err.error
        : (err.data as { message: string }).message;
    toast.error(errMsg, { duration: 3000 });
  } else if (isErrorWithMessage(err)) {
    // you can access a string 'message' property here
    toast.error(err.message, { duration: 3000 });
  }
}
