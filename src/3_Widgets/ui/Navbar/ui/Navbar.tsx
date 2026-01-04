import React from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AppLink, CustomInput } from '6_Shared';
import { AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const dayPoints = useScoreStore((state) => state.dayPoints);
    const weekPoints = useScoreStore((state) => state.weekPoints);

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.links}>
                <div>
                    <AppLink theme={AppLinkTheme.PRIMARY} to="/" className={cls.mainLink}>
                        {t('Главная')}
                    </AppLink>

                    <AppLink theme={AppLinkTheme.PRIMARY} to="/about">
                        {t('О сайте')}
                    </AppLink>
                </div>
            </div>
            <div className={cls.navbar_stats}>
                <CustomInput
                    type="text"
                    value={`${t('День')}: ${dayPoints}`}
                    readOnly
                    className={cls.navbar_stat}
                />
                <CustomInput
                    type="text"
                    value={`${t('Неделя')}: ${weekPoints}`}
                    readOnly
                    className={cls.navbar_stat}
                />
                <CustomInput
                    type="text"
                    placeholder="сезон"
                    readOnly
                    className={cls.navbar_stat}
                />
            </div>
        </div>
    );
};
