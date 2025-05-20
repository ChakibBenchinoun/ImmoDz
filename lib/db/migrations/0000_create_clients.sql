CREATE TABLE `clients` (
	`client_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone_number` text NOT NULL,
	`type` text NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`status` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clients_phone_number_unique` ON `clients` (`phone_number`);