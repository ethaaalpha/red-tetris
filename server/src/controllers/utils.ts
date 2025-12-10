import { ZodError } from "zod";

export function formatSchemeError(error: ZodError) {
  return error.issues.reduce(
    (acc, issue) => {
      const varName = issue.path.join(".");
      acc[varName] = issue.message;
      return acc;
    },
    {} as Record<string, string>
  );
}
