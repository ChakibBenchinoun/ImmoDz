import { sql } from "drizzle-orm";

import { sqliteTable } from "drizzle-orm/sqlite-core";

export const clients = sqliteTable("clients", (t) => ({
	client_id: t.integer().primaryKey({ autoIncrement: true }),
	name: t.text().notNull(),
	email: t.text(),
	phone_number: t.text().notNull().unique(),
	type: t.text().notNull(),
	version: t
		.integer()
		.notNull()
		.default(0)
		.$onUpdateFn(() => sql`version + 1`),
	status: t.text().notNull(),
	created_at: t.text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
	updated_at: t
		.text()
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdateFn(() => sql`(CURRENT_TIMESTAMP)`),
}));

export type ClientSelect = typeof clients.$inferSelect;
export type ClientInsert = typeof clients.$inferInsert;
