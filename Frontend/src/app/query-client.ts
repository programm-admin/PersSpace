import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Provider } from '@angular/core';
import { QueryClient } from '@tanstack/angular-query-experimental';

export function provideTanStackQueryClient(): Provider[] {
    return [
        {
            provide: QueryClient,
            useFactory: (platformId: Object) => {
                if (!isPlatformBrowser(platformId)) {
                    // no TanStackQuery-client in server context!
                    return null;
                }

                return new QueryClient({
                    defaultOptions: {
                        queries: {
                            staleTime: 30_000,
                            gcTime: 300_000,
                            refetchOnWindowFocus: false,
                            retry: 1,
                        },
                    },
                });
            },
            deps: [PLATFORM_ID],
        },
    ];
}
