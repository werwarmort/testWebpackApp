import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const isAuth = localStorage.getItem('user_logged_in');
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to={RoutePath.auth} state={{ from: location }} replace />;
    }

    return children;
}
