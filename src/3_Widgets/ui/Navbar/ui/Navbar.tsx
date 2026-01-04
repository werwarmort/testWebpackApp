import React from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AppLink, CustomInput } from '6_Shared';
import { AppLinkTheme } from '6_Shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

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
                    type="number"
                    placeholder="день"
                    readOnly
                    className={cls.navbar_stat}
                />
                <CustomInput
                    type="number"
                    placeholder="неделя"
                    readOnly
                    className={cls.navbar_stat}
                />
                <CustomInput
                    type="number"
                    placeholder="сезон"
                    readOnly
                    className={cls.navbar_stat}
                />
            </div>
        </div>
    );
};
