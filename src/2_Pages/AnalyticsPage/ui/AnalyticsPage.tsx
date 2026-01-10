import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AnalyticsCharts } from '3_Widgets/AnalyticsCharts/ui/AnalyticsCharts';
import cls from './AnalyticsPage.module.scss';

interface AnalyticsPageProps {
    className?: string;
}

const AnalyticsPage: FC<AnalyticsPageProps> = ({ className }) => {
    const { t } = useTranslation('analytics');

    return (
        <div className={classNames(cls.AnalyticsPage, {}, [className])}>
            <h1 className={cls.title}>{t('Аналитика')}</h1>
            <AnalyticsCharts />
        </div>
    );
};

export default AnalyticsPage;