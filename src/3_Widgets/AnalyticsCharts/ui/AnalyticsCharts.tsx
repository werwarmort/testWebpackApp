import { FC, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import { Action } from '5_Entities/Score/model/types/score';
import { LineChart } from './LineChart';
import cls from './AnalyticsCharts.module.scss';

export const AnalyticsCharts: FC = () => {
    const { t } = useTranslation('analytics');
    
    // Загружаем актуальный список действий с сервера
    const { data: actionsData } = useSWR<Action[]>('/actions', swrFetcher);
    const setActions = useScoreStore(state => state.setActions);
    const actions = useScoreStore(state => state.actions);

    // Синхронизируем со стором (если нужно)
    useEffect(() => {
        if (actionsData) {
            setActions(actionsData);
        }
    }, [actionsData, setActions]);

    const getPointsForDate = (date: Date) => {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const endOfDay = startOfDay + 24 * 60 * 60 * 1000;

        const dayActions = actions.filter(a => a.createdAt >= startOfDay && a.createdAt < endOfDay);
        
        return {
            total: dayActions.reduce((sum, a) => sum + (a.isPenalty ? 0 : a.points), 0),
            penalty: dayActions.reduce((sum, a) => sum + (a.isPenalty ? a.points : 0), 0)
        };
    };

    const weekData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const pts = getPointsForDate(date);
            data.push({
                label: date.toLocaleDateString(undefined, { weekday: 'short' }),
                value: pts.total,
                penaltyValue: pts.penalty
            });
        }
        return data;
    }, [actions]);

    const seasonData = useMemo(() => {
        const data = [];
        for (let i = 2; i >= 0; i--) {
            const weekEnd = new Date();
            weekEnd.setDate(weekEnd.getDate() - i * 7);
            const weekStart = new Date(weekEnd);
            weekStart.setDate(weekStart.getDate() - 6);
            
            const weekActions = actions.filter(a => a.createdAt >= weekStart.getTime() && a.createdAt <= weekEnd.getTime());
            
            data.push({
                label: `${t('Неделя')} ${3-i}`,
                value: weekActions.reduce((sum, a) => sum + (a.isPenalty ? 0 : a.points), 0),
                penaltyValue: weekActions.reduce((sum, a) => sum + (a.isPenalty ? a.points : 0), 0)
            });
        }
        return data;
    }, [actions, t]);

    const yearData = useMemo(() => {
        const data = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthStart = d.getTime();
            const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).getTime();

            const monthActions = actions.filter(a => a.createdAt >= monthStart && a.createdAt <= monthEnd);

            data.push({
                label: d.toLocaleDateString(undefined, { month: 'short' }),
                value: monthActions.reduce((sum, a) => sum + (a.isPenalty ? 0 : a.points), 0),
                penaltyValue: monthActions.reduce((sum, a) => sum + (a.isPenalty ? a.points : 0), 0)
            });
        }
        return data;
    }, [actions]);

    return (
        <div className={cls.AnalyticsCharts}>
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