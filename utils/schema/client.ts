import { z } from "zod";
import { omitEmpty } from "../schema-helpers";

export enum ClientStatusEnum {
	Active = "active",
	Deleted = "deleted",
}

export const Client = z.object({
	created_at: z.string(),
	status: z.string(),
	name: z.string(),
	email: z.string().email().optional().or(z.literal("")),
	phone_number: z.string(),
	type: z.string(),
	version: omitEmpty(z.number()),
});

export const UpdateClient = z.object({
	name: z
		.string({ required_error: "must be provided" })
		.min(1, "must be provided")
		.max(500),
	email: z.string().email().optional().or(z.literal("")),
	phone_number: z
		.string({ required_error: "must be provided" })
		.min(8, "must be at least 8 characters long")
		.max(72, "must be at most 72 characters long"),
	type: z
		.string({ required_error: "must be provided" })
		.min(1, "must be provided")
		.max(500),
});
