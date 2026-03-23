import { toast } from "react-toastify";

type ApiErrorDetails = {
  hint?: string;
  message: string;
};

const getBlobError = async (error: unknown) => {
  const blobError =
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    error.error instanceof Blob
      ? await error.error.text()
      : null;

  if (!blobError) {
    return null;
  }

  try {
    return JSON.parse(blobError) as { hint?: string; message?: string };
  } catch {
    return null;
  }
};

export const GetApiError = (
  error: unknown,
  fallbackMessage = "Something went wrong",
): ApiErrorDetails => {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return { message: error.message };
  }

  return { message: fallbackMessage };
};

export const catchError = async <T>(
  promise: Promise<T>,
  showAlertError = false,
  fallbackMessage = "Something went wrong",
): Promise<[T, undefined] | [undefined, Error]> => {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (error) {
    const blobErrors = await getBlobError(error);
    const apiError = GetApiError(error, blobErrors?.message || fallbackMessage);
    const normalizedError = new Error(
      blobErrors?.message || apiError.message || fallbackMessage,
    );

    if (blobErrors?.hint) {
      normalizedError.cause = blobErrors.hint;
    }

    if (showAlertError) {
      const alertMessage = blobErrors?.hint
        ? `${blobErrors.hint}. ${normalizedError.message}`
        : normalizedError.message;

      toast.error(alertMessage);
    }

    return [undefined, normalizedError];
  }
};
