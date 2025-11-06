import React, { useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { ThemeSwitcher } from '3_Widgets/ui/ThemeSwitcher';
import { LangSwitcher } from '6_Shared/ui/LangSwitcher/LangSwitcher';
import cls from './Sidebar.module.scss';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <button className={styles.toggleSidebarBtn} type="button" onClick={onToggle}>{collapsed ? `>>` : `<<`}</button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};
