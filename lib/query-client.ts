import { toast } from "@/components/toast";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	type QueryKey,
	matchQuery,
} from "@tanstack/react-query";
import { FetchError } from "ofetch";
import * as z from "zod";

export const queryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				retry: false,
				staleTime: 5 * 60 * 1000, // 5 minutes
			},
		},
		queryCache: new QueryCache({
			onError: (error, query) => {
				if (error instanceof FetchError) {
					console.error(`[FetchError][${query.queryKey}]: `, error.response);
					toast({
						variant: "destructive",
						title: "Error",
						description: JSON.stringify(error.response?._data?.error),
					});
					return error.response?._data;
				}
				if (error instanceof z.ZodError) {
					console.error("[ZodError]: ", {
						query: query.queryKey,
						error: error.issues,
					});
					toast({
						title:
							"Validation Error - Check the console for the validation Error",
						variant: "destructive",
					});
					return error.issues;
				}
				toast({
					title: "Check the console for the error",
					variant: "destructive",
				});
				return error;
			},
		}),
		mutationCache: new MutationCache({
			onSuccess: async (_data, _variables, _context, mutation) => {
				// Handle standard invalidations
				const client = queryClient();
				await client.invalidateQueries({
					refetchType: "all",
					predicate: (query) =>
						mutation.meta?.invalidates?.some((queryKey) =>
							matchQuery({ queryKey }, query),
						) ?? true,
				});
			},
			onError: (error) => {
				if (error instanceof FetchError) {
					toast({
						variant: "destructive",
						title: "Fetch Error",
						description: JSON.stringify(error.response?._data),
					});
					return error.response?._data;
				}
				console.error("[Error][Unknown Error]: ", error);
				toast({
					title: "Check the console for the error",
					variant: "destructive",
				});
				return error;
			},
		}),
	});

declare module "@tanstack/react-query" {
	interface Register {
		mutationMeta: {
			invalidates?: Array<QueryKey>;
		};
	}
}
