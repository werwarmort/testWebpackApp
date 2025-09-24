import React from 'react';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { ETheme, useTheme } from '1_App/providers/ThemeProvider';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { classNames } from '6_Shared/lib/classNames/classNames';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === ETheme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};
