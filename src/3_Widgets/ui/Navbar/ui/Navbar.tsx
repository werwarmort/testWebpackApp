import React from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { CustomInput } from '6_Shared';
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
