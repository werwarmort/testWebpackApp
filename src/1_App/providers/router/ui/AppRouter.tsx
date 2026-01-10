import { PageLoader } from '3_Widgets/ui/PageLoader';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from '6_Shared/config/routerConfig/routerConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {Object.values(routeConfig).map(({ element, path, authOnly }: AppRoutesProps) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            {authOnly ? <RequireAuth>{element as JSX.Element}</RequireAuth> : element}
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
