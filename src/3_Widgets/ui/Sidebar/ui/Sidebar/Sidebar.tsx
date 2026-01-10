import React, { useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { ThemeSwitcher } from '3_Widgets/ui/ThemeSwitcher';
import { LangSwitcher } from '6_Shared/ui/LangSwitcher/LangSwitcher';
import { AppLink, AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '6_Shared/model/store/uiStore';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { isSidebarOpen, closeSidebar } = useUIStore();

    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && <div className={cls.overlay} onClick={closeSidebar} />}
            
            <div 
                className={classNames(
                    cls.Sidebar, 
                    { 
                        [cls.collapsed]: collapsed,
                        [cls.mobileOpen]: isSidebarOpen
                    }, 
                    [className]
                )}
            >
                <button className={cls.toggleSidebarBtn} type="button" onClick={onToggle}>
                    {collapsed ? `>>` : `<<`}
                </button>
                <div className={cls.items}>
                    <AppLink onClick={closeSidebar} theme={AppLinkTheme.SECONDARY} to={RoutePath.main} className={cls.item}>
                        <span className={cls.linkText}>{collapsed ? t('Счет')[0] : t('Счет')}</span>
                    </AppLink>
                    <AppLink onClick={closeSidebar} theme={AppLinkTheme.SECONDARY} to={RoutePath.todo} className={cls.item}>
                        <span className={cls.linkText}>{collapsed ? t('Задачи')[0] : t('Задачи')}</span>
                    </AppLink>
                    <AppLink onClick={closeSidebar} theme={AppLinkTheme.SECONDARY} to={RoutePath.goals} className={cls.item}>
                        <span className={cls.linkText}>
                            {collapsed ? t('Глобальные цели')[0] : t('Глобальные цели')}
                        </span>
                    </AppLink>
                    <AppLink
                        onClick={closeSidebar}
                        theme={AppLinkTheme.SECONDARY}
                        to={RoutePath.analytics}
                        className={cls.item}
                    >
                        <span className={cls.linkText}>
                            {collapsed ? t('Аналитика')[0] : t('Аналитика')}
                        </span>
                    </AppLink>
                </div>
                <div className={cls.switchers}>
                    <ThemeSwitcher collapsed={collapsed} />
                    <LangSwitcher className={cls.lang} />
                </div>
            </div>
        </>
    );
};
