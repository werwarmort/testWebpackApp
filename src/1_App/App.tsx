import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom'
import './styles/index.scss'
import {classNames} from "6_Shared/lib/classNames/classNames";
import {useTheme} from "1_App/providers/ThemeProvider";
import {AboutPage} from "2_Pages/AboutPage";
import {MainPage} from "2_Pages/MainPage";
import {AppRouter} from "1_App/providers/router";


const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О сайте</Link>
      <AppRouter/>
    </div>
  );
};

export default App;
