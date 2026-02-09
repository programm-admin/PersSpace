import { QueryClient } from '@tanstack/angular-query-experimental';

export const tanStackQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000, // 30 s refetch
            gcTime: 300_000, // 5 min caching
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
