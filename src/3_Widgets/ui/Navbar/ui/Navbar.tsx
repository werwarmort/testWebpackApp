import React, { useMemo } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { CustomInput } from '6_Shared';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { AppLink, AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import { UserIcon } from '6_Shared/assets/icons/UserIcon';
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

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.auth}>
                {user ? (
                    <AppLink 
                        to={RoutePath.profile} 
                        theme={AppLinkTheme.SECONDARY}
                        className={cls.profileLink}
                    >
                        <UserIcon className={cls.userIcon} />
                    </AppLink>
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
