import React, { useMemo, useEffect } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { CustomInput } from '6_Shared';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { AppLink, AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    
    // Получаем баллы с бэкенда
    const { data: scoreData } = useSWR('/actions/score', swrFetcher);

    const dayPoints = scoreData?.dayPoints ?? 0;
    const weekPoints = scoreData?.weekPoints ?? 0;

    const user = useMemo(() => {
        const info = localStorage.getItem('user_info');
        return info ? JSON.parse(info) : null;
    }, []);

    const onLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        window.location.reload();
    };

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.auth}>
                {user ? (
                    <div className={cls.userInfo}>
                        <span className={cls.username}>{user.username}</span>
                        <Button 
                            theme={ThemeButton.CLEAR} 
                            onClick={onLogout}
                            className={cls.logoutBtn}
                        >
                            {t('Выйти')}
                        </Button>
                    </div>
                ) : (
                    <AppLink 
                        to={RoutePath.auth} 
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.loginLink}
                    >
                        {t('Войти')}
                    </AppLink>
                )}
            </div>

            <div className={cls.navbar_stats}>
                <CustomInput
                    type="text"
                    value={dayPoints.toString()}
                    placeholder={t('день')}
                    readOnly
                    className={cls.navbar_stat}
                    title={t('день')}
                />
                <CustomInput
                    type="text"
                    value={weekPoints.toString()}
                    placeholder={t('неделя')}
                    readOnly
                    className={cls.navbar_stat}
                    title={t('неделя')}
                />
                <CustomInput
                    type="text"
                    placeholder={t('сезон')}
                    readOnly
                    className={cls.navbar_stat}
                    title={t('сезон')}
                />
            </div>
        </div>
    );
};
