import React, { useMemo, useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { HomeIcon } from '6_Shared/assets/icons/HomeIcon';
import { ListIcon } from '6_Shared/assets/icons/ListIcon';
import { TrophyIcon } from '6_Shared/assets/icons/TrophyIcon';
import { ChartIcon } from '6_Shared/assets/icons/ChartIcon';
import { UserIcon } from '6_Shared/assets/icons/UserIcon';
import { ThemeSwitcher } from '3_Widgets/ui/ThemeSwitcher';
import { LangSwitcher } from '6_Shared/ui/LangSwitcher/LangSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const location = useLocation();

    const onToggle = () => {
        setCollapsed(prev => !prev);
    };

    const itemsList = useMemo(() => [
        {
            path: RoutePath.main,
            text: t('Счет'),
            Icon: HomeIcon,
        },
        {
            path: RoutePath.todo,
            text: t('Задачи'),
            Icon: ListIcon,
        },
        {
            path: RoutePath.goals,
            text: t('Глобальные цели'),
            Icon: TrophyIcon,
        },
        {
            path: RoutePath.analytics,
            text: t('Аналитика'),
            Icon: ChartIcon,
        },
        {
            path: RoutePath.profile,
            text: t('Профиль'),
            Icon: UserIcon,
            mobileOnly: true,
        },
    ], [t]);

    return (
        <div 
            className={classNames(
                cls.Sidebar, 
                { 
                    [cls.collapsed]: collapsed,
                }, 
                [className]
            )}
        >
            <button className={cls.toggleSidebarBtn} type="button" onClick={onToggle}>
                {collapsed ? `>>` : `<<`}
            </button>
            <div className={cls.items}>
                {itemsList.map((item) => (
                    <AppLink
                        key={item.path}
                        theme={AppLinkTheme.SECONDARY}
                        to={item.path}
                        className={classNames(
                            cls.item,
                            { 
                                [cls.active]: location.pathname === item.path,
                                [cls.mobileOnly]: item.mobileOnly 
                            },
                            []
                        )}
                    >
                        <item.Icon className={cls.icon} />
                        <span className={cls.linkText}>
                            {item.text}
                        </span>
                    </AppLink>
                ))}
            </div>
            
            <div className={cls.switchers}>
                <ThemeSwitcher collapsed={collapsed} />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
