import { MainPage } from '2_Pages/MainPage';
import { AboutPage } from '2_Pages/AboutPage';
import { RouteProps } from 'react-router-dom';

// interface AppRouteProps {
//   path: string;
//   element: React.ReactNode | null;;
// }

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
};
