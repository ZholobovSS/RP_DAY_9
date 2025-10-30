import type { ComponentType } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const withTanStackQuery = (WrappedComponent: ComponentType) => () => (
    <QueryClientProvider client={queryClient}>
        <WrappedComponent />
    </QueryClientProvider>
);
