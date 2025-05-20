import type * as z from "zod";
export function omitEmpty<T extends z.ZodTypeAny>(schema: T) {
	return schema.nullish().transform((val) => val ?? undefined);
}
