import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { clients } from "../lib/db/schema";
import { CreateClient } from "../utils/schema/client";


export interface Env {
	DB: DrizzleD1Database;
}

const worker = {
	async fetch(request: Request, env: Env): Promise<Response> {
		const db = drizzle(env.DB);
		const url = new URL(request.url);

		if (url.pathname === "/api/clients" && request.method === "GET") {
			const results = await db.select().from(clients).all();
			return Response.json(results);
		}
		if (url.pathname === "/api/clients" && request.method === "POST") {
			const body = await request.json();
			const validated = CreateClient.parse(body)
			await db.insert(clients).values(validated);
			return Response.json({ success: true, message: "Client created" });
		}
		return new Response("Not found", { status: 404 });
	},
};

export default worker;
