import React, { useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { ETheme, useTheme } from '1_App/providers/ThemeProvider';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import styles from './ThemeSwitcher.module.scss';
import Sun from '../assets/icons/sun.svg';
import Moon from '../assets/icons/moon.svg';

interface ThemeSwitcherProps {
    collapsed: boolean;
    className?: string;
}

export const ThemeSwitcher = React.memo(({ collapsed, className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();
    const [isAnimated, setIsAnimated] = useState(false);

    const handleClick = () => {
        // добавляем анимацию
        setIsAnimated(true);

        // переключаем тему
        toggleTheme();

        // убираем анимацию через 500ms
        setTimeout(() => {
            setIsAnimated(false);
        }, 500);
    };

    const isDark = theme === ETheme.DARK;

    return (
      <Button
        theme={ThemeButton.CLEAR}
        className={classNames(styles.btn, { [styles.btn_dark]: isDark }, [className])}
        onClick={handleClick}
      >
        <div className={classNames(styles.btn__indicator, { [styles.btn__indicator_dark]: isDark }, [])}>
          <div className={classNames(styles.btn__icon_container, { [styles.animated]: isAnimated }, [])}>
            {isDark ? <Moon className={styles.btn__icon} /> : <Sun className={styles.btn__icon} />}
          </div>
        </div>
      </Button>
    );
});
