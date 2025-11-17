import './styles/index.scss';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useTheme } from '1_App/providers/ThemeProvider';
import { Navbar } from '3_Widgets';
import { AppRouter } from '1_App/providers/router';
import { Sidebar } from '3_Widgets/ui/Sidebar';

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
              <Navbar />
              <div className="content-page">
                  <Sidebar />
                  <AppRouter />
              </div>
        </div>
    );
};

export default App;
