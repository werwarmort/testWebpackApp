import React from 'react';
import cls from './Navbar.module.scss';
import {classNames} from "6_Shared/lib/classNames/classNames";
import {AppLink} from "6_Shared";
import {AppLinkTheme} from "6_Shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "3_Widgets/ui/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames (cls.navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.mainLink}>
                    Главная
                </AppLink>


                <AppLink theme={AppLinkTheme.RED} to={'/about'}>
                    О сайте
                </AppLink>
            </div>
        </div>
    );
};

