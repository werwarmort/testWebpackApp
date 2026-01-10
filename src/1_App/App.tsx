import './styles/index.scss';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useTheme } from '1_App/providers/ThemeProvider';
import { Navbar } from '3_Widgets';
import { AppRouter } from '1_App/providers/router';
import { Sidebar } from '3_Widgets/ui/Sidebar';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';

const App = () => {
    const { theme } = useTheme();
    const { pathname } = useLocation();

    // Скрываем навигацию на странице авторизации
    const isAuthPage = pathname === RoutePath.auth;

    return (
        <div className={classNames('app', {}, [theme])}>
              {!isAuthPage && <Navbar />}
              <div className="content-page">
                  {!isAuthPage && <Sidebar />}
                  <AppRouter />
              </div>
        </div>
    );
};

export default App;
