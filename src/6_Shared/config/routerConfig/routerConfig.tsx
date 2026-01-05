import { RouteProps } from 'react-router-dom';
import { ScorePage } from '2_Pages/ScorePage';
import { TodoPage } from '2_Pages/TodoPage';
import { StatsPage } from '2_Pages/StatsPage';
import { NotFoundPage } from '2_Pages/NotFoundPage';

export enum AppRoutes {
    MAIN = 'main',
    TODO = 'todo',
    STATS = 'stats',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TODO]: '/todo',
    [AppRoutes.STATS]: '/stats',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <ScorePage />,
    },
    [AppRoutes.TODO]: {
        path: RoutePath.todo,
        element: <TodoPage />,
    },
    [AppRoutes.STATS]: {
        path: RoutePath.stats,
        element: <StatsPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};