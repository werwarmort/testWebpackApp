import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = localStorage.getItem('auth_token');
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.auth} state={{ from: location }} replace />;
    }

    return children;
}
