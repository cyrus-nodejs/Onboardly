export function handleError(
  err: unknown,
  fallback = "Something went wrong",
): string {
  if (err instanceof Error) {
    return err.message || fallback;
  }

  if (typeof err === "string") {
    return err;
  }

  if (typeof err === "object" && err !== null) {
    const maybeError = err as { message?: unknown };
    if (typeof maybeError.message === "string") {
      return maybeError.message;
    }
  }

  return fallback;
}
