import { AppwriteException } from "appwrite";

export const handleAppwriteError = (error: unknown) => {
  if (error instanceof AppwriteException) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    "message" in error
  ) {
    const err = error as { name: string; message: string };
    return err.message;
  }

  return "An unexpected error occured. Please try again later.";
};

export default function cns(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function withAsyncErrorHandler<
  T extends (...args: any[]) => Promise<any>
>(fn: T): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error(handleAppwriteError(error));
    }
  };
}

export function stripHTMLTags(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
