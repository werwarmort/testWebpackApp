import './styles/index.scss'
import {classNames} from "6_Shared/lib/classNames/classNames";
import {useTheme} from "1_App/providers/ThemeProvider";
import {Navbar} from "3_Widgets";
import {AppRouter} from "1_App/providers/router";
import {Sidebar} from "3_Widgets/ui/Sidebar";
import {Suspense} from "react";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
