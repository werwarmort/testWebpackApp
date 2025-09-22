import { classNames } from '6_Shared/lib/classNames/classNames';
import { ETheme, useTheme } from '1_App/providers/ThemeProvider';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import cls from './ThemeSwitcher.module.scss';
import LightIcon from '../assets/icons/theme-light.svg';
import DarkIcon from '../assets/icons/theme-dark.svg';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === ETheme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};
