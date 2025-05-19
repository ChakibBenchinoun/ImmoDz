import { type VariantProps, defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

const {
	cva,
	cx: cn,
	compose,
} = defineConfig({
	hooks: {
		"cx:done": twMerge,
	},
});

export { type VariantProps, cva, cn, compose };
