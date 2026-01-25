import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { ThemeSwitcher } from '3_Widgets/ui/ThemeSwitcher';
import { LangSwitcher } from '6_Shared/ui/LangSwitcher/LangSwitcher';
import { $api } from '6_Shared/api/api';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import cls from './ProfilePage.module.scss';

const ProfilePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const user = useMemo(() => {
        const info = localStorage.getItem('user_info');
        return info ? JSON.parse(info) : null;
    }, []);

    const onLogout = async () => {
        try {
            await $api('/auth/logout', {
                method: 'POST',
            });
        } catch (e) {
            console.error('Logout failed', e);
        } finally {
            localStorage.removeItem('user_logged_in');
            localStorage.removeItem('user_info');
            // Очищаем кэш SWR, чтобы данные не мелькали при следующем входе
            // mutate(() => true, undefined, { revalidate: false }); 
            navigate(RoutePath.auth);
        }
    };

    if (!user) {
        return <div className={cls.profilePage}>{t('Пользователь не авторизован')}</div>;
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

            <Button theme={ThemeButton.DEFAULT} onClick={onLogout} className={cls.logoutBtn}>
                {t('Выйти')}
            </Button>

            <div className={cls.version}>v{__PROJECT_VERSION__}</div>
        </div>
    );
};

export default ProfilePage;
