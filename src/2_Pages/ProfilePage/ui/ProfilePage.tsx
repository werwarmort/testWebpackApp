import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { ThemeSwitcher } from '3_Widgets/ui/ThemeSwitcher';
import { LangSwitcher } from '6_Shared/ui/LangSwitcher/LangSwitcher';
import cls from './ProfilePage.module.scss';

const ProfilePage = () => {
    const { t } = useTranslation();

    const user = useMemo(() => {
        const info = localStorage.getItem('user_info');
        return info ? JSON.parse(info) : null;
    }, []);

    const onLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        window.location.reload();
    };

    if (!user) {
        return (
            <div className={cls.profilePage}>
                {t('Пользователь не авторизован')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.profilePage, {}, [])}>
            <h1>{t('Личный кабинет')}</h1>
            
            <div className={cls.userInfo}>
                <div>
                    <div className={cls.label}>{t('Имя пользователя')}</div>
                    <div className={cls.value}>{user.username}</div>
                </div>
            </div>

            <div className={cls.settings}>
                <div className={cls.settingItem}>
                    <span>{t('Тема')}:</span>
                    <ThemeSwitcher collapsed={false} />
                </div>
                <div className={cls.settingItem}>
                    <span>{t('Язык')}:</span>
                    <LangSwitcher className={cls.langSwitcher} />
                </div>
            </div>

            <Button 
                theme={ThemeButton.DEFAULT} 
                onClick={onLogout}
                className={cls.logoutBtn}
            >
                {t('Выйти')}
            </Button>
        </div>
    );
};

export default ProfilePage;
