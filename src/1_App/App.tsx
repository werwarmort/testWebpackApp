import './styles/index.scss'
import {classNames} from "6_Shared/lib/classNames/classNames";
import {useTheme} from "1_App/providers/ThemeProvider";
import {Navbar} from "3_Widgets";
import {AppRouter} from "1_App/providers/router";


const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <AppRouter />
      <button onClick={toggleTheme}>TOGGLE</button>
    </div>
  );
};

export default App;
