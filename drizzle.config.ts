import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".dev.vars"] });

export default defineConfig({
	dialect: "sqlite",
	schema: "./lib/db/schema/*",
	out: "./lib/db/migrations",
	driver: "d1-http",
	dbCredentials: {
		// accountId: "<your-account-id>",
		// databaseId: "",
		// token: "<your-wrangler-token>", // Get from Cloudflare dashboard
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
		databaseId: process.env.CLOUDFLARE_DATABASE_ID || "",
		token: process.env.CLOUDFLARE_TOKEN || "",
	},
});
