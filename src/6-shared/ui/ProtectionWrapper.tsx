import type { FC, PropsWithChildren } from 'react';
import type { UseAuthStrategy } from '../model/auth';
import { Navigate, useLocation } from 'react-router';

interface Props {
    useAuthStrategy: UseAuthStrategy;
}

export const ProtectionWrapper: FC<PropsWithChildren<Props>> = ({ children, useAuthStrategy }) => {
    const { isAuthenticated, isReady } = useAuthStrategy();
    const location = useLocation();

    if (!isReady) return null;

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/signin"
                replace={true}
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    return children;
};
