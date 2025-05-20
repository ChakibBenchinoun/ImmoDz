import { z } from "zod";

export function addZodError(path: string, message: string) {
  return new z.ZodError([
    { code: z.ZodIssueCode.custom, path: [path], message },
  ]);
}
