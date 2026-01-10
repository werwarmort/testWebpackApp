import { RouteProps } from 'react-router-dom';
import { ScorePage } from '2_Pages/ScorePage';
import { TodoPage } from '2_Pages/TodoPage';
import { AnalyticsPage } from '2_Pages/AnalyticsPage';
import { GoalsPage } from '2_Pages/GoalsPage';
import { AuthPage } from '2_Pages/AuthPage';
import { NotFoundPage } from '2_Pages/NotFoundPage';
import { ProfilePage } from '2_Pages/ProfilePage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    TODO = 'todo',
    ANALYTICS = 'analytics',
    GOALS = 'goals',
    AUTH = 'auth',
    PROFILE = 'profile',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TODO]: '/todo',
    [AppRoutes.ANALYTICS]: '/analytics',
    [AppRoutes.GOALS]: '/goals',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <ScorePage />,
        authOnly: true,
    },
    [AppRoutes.TODO]: {
        path: RoutePath.todo,
        element: <TodoPage />,
        authOnly: true,
    },
    [AppRoutes.ANALYTICS]: {
        path: RoutePath.analytics,
        element: <AnalyticsPage />,
        authOnly: true,
    },
    [AppRoutes.GOALS]: {
        path: RoutePath.goals,
        element: <GoalsPage />,
        authOnly: true,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};