import React, { useMemo } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { CustomInput } from '6_Shared';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { AppLink, AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { RoutePath } from '6_Shared/config/routerConfig/routerConfig';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import { UserIcon } from '6_Shared/assets/icons/UserIcon';
import { Todo } from '5_Entities/Todo/model/types/todo';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Получаем баллы с бэкенда
    const { data: scoreData } = useSWR('/actions/score', swrFetcher);
    const { data: todos } = useSWR<Todo[]>('/tasks', swrFetcher);

    const dayPoints = scoreData?.dayPoints ?? 0;
    const weekPoints = scoreData?.weekPoints ?? 0;
    const monthPoints = scoreData?.monthPoints ?? 0;

    const user = useMemo(() => {
        const info = localStorage.getItem('user_info');
        return info ? JSON.parse(info) : null;
    }, []);

    const hasActiveDaily = useMemo(() => {
        return todos?.some((t) => t.type === 'daily_challenge' && !t.isCompleted);
    }, [todos]);

    const hasActiveWeekly = useMemo(() => {
        return todos?.some((t) => t.type === 'weekly_challenge' && !t.isCompleted);
    }, [todos]);

    const onChallengeClick = () => {
        navigate(RoutePath.todo);
    };

    return (
        <div className={classNames(cls.navbar, { [cls.loggedIn]: !!user }, [className])}>
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

            <div className={cls.challenges}>
                {hasActiveDaily && (
                    <Button
                        theme={ThemeButton.CLEAR}
                        onClick={onChallengeClick}
                        title={t('режим челенджа дня')}
                    >
                        <img
                            src="/day.svg"
                            alt={t('режим челенджа дня')}
                            className={cls.challengeIcon}
                        />
                    </Button>
                )}
                {hasActiveWeekly && (
                    <Button
                        theme={ThemeButton.CLEAR}
                        onClick={onChallengeClick}
                        title={t('режим челенджа недели')}
                    >
                        <img
                            src="/week.svg"
                            alt={t('режим челенджа недели')}
                            className={cls.challengeIcon}
                        />
                    </Button>
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
                    value={monthPoints.toString()}
                    placeholder={t('месяц')}
                    readOnly
                    className={cls.navbar_stat}
                    title={t('месяц')}
                />
            </div>
        </div>
    );
};
