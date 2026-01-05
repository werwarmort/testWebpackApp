import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { LineChart } from './LineChart';
import cls from './StatsCharts.module.scss';

export const StatsCharts: FC = () => {
    const { t } = useTranslation('stats');
    const actions = useScoreStore(state => state.actions);

    // Вспомогательная функция для получения очков за конкретный день
    const getPointsForDate = (date: Date) => {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const endOfDay = startOfDay + 24 * 60 * 60 * 1000;

        return actions
            .filter(a => a.createdAt >= startOfDay && a.createdAt < endOfDay)
            .reduce((sum, a) => sum + (a.isPenalty ? -a.points : a.points), 0);
    };

    // 1. Данные за неделю (последние 7 дней)
    const weekData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            data.push({
                label: date.toLocaleDateString(undefined, { weekday: 'short' }),
                value: getPointsForDate(date)
            });
        }
        return data;
    }, [actions]);

    // 2. Данные за сезон (3 недели)
    const seasonData = useMemo(() => {
        const data = [];
        for (let i = 2; i >= 0; i--) {
            const weekEnd = new Date();
            weekEnd.setDate(weekEnd.getDate() - i * 7);
            const weekStart = new Date(weekEnd);
            weekStart.setDate(weekStart.getDate() - 6);
            
            const weekPoints = actions
                .filter(a => a.createdAt >= weekStart.getTime() && a.createdAt <= weekEnd.getTime())
                .reduce((sum, a) => sum + (a.isPenalty ? -a.points : a.points), 0);

            data.push({
                label: `${t('Неделя')} ${3-i}`,
                value: weekPoints
            });
        }
        return data;
    }, [actions, t]);

    // 3. Данные за год (12 месяцев)
    const yearData = useMemo(() => {
        const data = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthStart = d.getTime();
            const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).getTime();

            const monthPoints = actions
                .filter(a => a.createdAt >= monthStart && a.createdAt <= monthEnd)
                .reduce((sum, a) => sum + (a.isPenalty ? -a.points : a.points), 0);

            data.push({
                label: d.toLocaleDateString(undefined, { month: 'short' }),
                value: monthPoints
            });
        }
        return data;
    }, [actions]);

    return (
        <div className={cls.StatsCharts}>
            <LineChart 
                data={weekData} 
                title={t('Очки за неделю')} 
                color="#ffc906" 
            />
            <LineChart 
                data={seasonData} 
                title={t('Очки за сезон (3 недели)')} 
                color="#2cd32c" 
            />
            <LineChart 
                data={yearData} 
                title={t('Очки за год')} 
                color="#cc1e4a" 
            />
        </div>
    );
};
