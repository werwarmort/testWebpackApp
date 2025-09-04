import {ETheme, LOCAL_STORAGE_THEME_KEY, ThemeContext} from "./ThemeContext";
import {FC, useMemo, useState} from "react";

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ETheme || ETheme.LIGHT;

export const ThemeProvider: FC = ({children}) => {
  const [theme, setTheme] = useState<ETheme>(defaultTheme);

  const toggleTheme = () => {
    setTheme(theme === ETheme.DARK? ETheme.DARK : ETheme.LIGHT);
  }

  const defaultProps = useMemo(() => ({
    theme: theme,
    setTheme: setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
