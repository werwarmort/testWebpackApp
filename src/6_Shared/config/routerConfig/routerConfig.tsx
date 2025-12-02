import { MainPage } from '2_Pages/MainPage';
import { AboutPage } from '2_Pages/AboutPage';
import { RouteProps } from 'react-router-dom';
import {NotFoundPage} from "2_Pages/NotFoundPage";

// interface AppRouteProps {
//   path: string;
//   element: React.ReactNode | null;;
// }

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*',
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
    [AppRoutes.NOT_FOUND]: {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
    },
};
