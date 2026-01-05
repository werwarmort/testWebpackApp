import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { StatsCharts } from '3_Widgets/StatsCharts/ui/StatsCharts';
import cls from './StatsPage.module.scss';

interface StatsPageProps {
    className?: string;
}

const StatsPage: FC<StatsPageProps> = ({ className }) => {
    const { t } = useTranslation('stats');

    return (
        <div className={classNames(cls.StatsPage, {}, [className])}>
            <h1 className={cls.title}>{t('Статистика')}</h1>
            <StatsCharts />
        </div>
    );
};

export default StatsPage;
