import { Main } from '@/2-pages/Main/ui';
import { createBrowserRouter } from 'react-router';
import { NotFoundPage } from '@/2-pages/NotFound';
import { SignUpPage } from '@/2-pages/SignUp';
import { App } from '../App';
import { SignOutPage } from '@/2-pages/SignOut';
import { withProtection } from '@zh2s/react-utils';
import { useContextAuthStrategy } from '@/6-shared/lib/useContextAuthStrategy';
import { lazy } from 'react';
import { ActivityPage } from '@/2-pages/Activity';
import { UseEffectEventPage } from '@/2-pages/UseEffectEvent';
import { UseTransitionPage } from '@/2-pages/UseTransition';
import { UseOptimisticPage } from '@/2-pages/UseOptimistic';

const ProfilePage = lazy(async () => {
    const component = await import('@/2-pages/Profile');

    return { default: component.ProfilePage };
});

const SignInPage = lazy(async () => {
    const component = await import('@/2-pages/SignIn');

    return { default: component.SignInPage };
});

const ProfilePageWithProtection = withProtection(ProfilePage, useContextAuthStrategy);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: 'profile',
                element: <ProfilePageWithProtection />,
            },
            {
                path: 'activity',
                element: <ActivityPage />,
            },
            {
                path: 'useEffectEvent',
                element: <UseEffectEventPage />,
            },
            {
                path: 'useTransition',
                element: <UseTransitionPage />,
            },
            {
                path: 'useOptimistic',
                element: <UseOptimisticPage />,
            },
            {
                path: 'signUp',
                element: <SignUpPage />,
            },
            {
                path: 'signIn',
                element: <SignInPage />,
            },
            {
                path: 'signOut',
                element: <SignOutPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
