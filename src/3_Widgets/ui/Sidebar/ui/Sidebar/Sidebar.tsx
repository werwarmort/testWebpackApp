import React, { useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { ThemeSwitcher } from '3_Widgets/ui/ThemeSwitcher';
import { LangSwitcher } from '6_Shared/ui/LangSwitcher/LangSwitcher';
import { AppLink, AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    const onToggle = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <button className={cls.toggleSidebarBtn} type="button" onClick={onToggle}>
                {collapsed ? `>>` : `<<`}
            </button>
            <div className={cls.items}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.main}
                    className={cls.item}
                >
                    <span className={cls.linkText}>
                        {collapsed ? t('Счет')[0] : t('Счет')}
                    </span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.todo}
                    className={cls.item}
                >
                    <span className={cls.linkText}>
                        {collapsed ? t('Дела')[0] : t('Дела')}
                    </span>
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.stats}
                    className={cls.item}
                >
                    <span className={cls.linkText}>
                        {collapsed ? (t('Язык') === 'Ru' ? 'Ст' : 'St') : t('Статистика')}
                    </span>
                </AppLink>
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher collapsed={collapsed} />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
