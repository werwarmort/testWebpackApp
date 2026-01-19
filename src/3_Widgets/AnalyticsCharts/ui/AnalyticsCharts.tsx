import { FC, useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import { Action } from '5_Entities/Score/model/types/score';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { LineChart } from './LineChart';
import cls from './AnalyticsCharts.module.scss';

export const AnalyticsCharts: FC = () => {
    const { t } = useTranslation('analytics');
    const [monthViewMode, setMonthViewMode] = useState<'days' | 'weeks'>('days');
    
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
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Monday
        const monday = new Date(today.setDate(diff));
        
        const data = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            const pts = getPointsForDate(date);
            data.push({
                label: date.toLocaleDateString(undefined, { weekday: 'short' }),
                value: pts.total,
                penaltyValue: pts.penalty
            });
        }
        return data;
    }, [actions]);

    const monthDaysData = useMemo(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const data = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const pts = getPointsForDate(date);
            data.push({
                label: i.toString(),
                value: pts.total,
                penaltyValue: pts.penalty
            });
        }
        return data;
    }, [actions]);

    const monthWeeksData = useMemo(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const weeks = [];
        let currentWeekPoints = 0;
        let currentWeekPenalty = 0;
        let currentWeekStart = 1;

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const pts = getPointsForDate(date);
            currentWeekPoints += pts.total;
            currentWeekPenalty += pts.penalty;

            // Если воскресенье или последний день месяца - закрываем неделю
            if (date.getDay() === 0 || i === daysInMonth) {
                weeks.push({
                    label: `${currentWeekStart}-${i}`,
                    value: currentWeekPoints,
                    penaltyValue: currentWeekPenalty
                });
                currentWeekPoints = 0;
                currentWeekPenalty = 0;
                currentWeekStart = i + 1;
            }
        }
        return weeks;
    }, [actions]);

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
            
            <div className={cls.monthChartContainer}>
                <div className={cls.switchers}>
                    <Button 
                        theme={ThemeButton.CLEAR} 
                        className={classNames(cls.switchBtn, { [cls.active]: monthViewMode === 'days' })}
                        onClick={() => setMonthViewMode('days')}
                    >
                        {t('По дням')}
                    </Button>
                    <Button 
                        theme={ThemeButton.CLEAR} 
                        className={classNames(cls.switchBtn, { [cls.active]: monthViewMode === 'weeks' })}
                        onClick={() => setMonthViewMode('weeks')}
                    >
                        {t('По неделям')}
                    </Button>
                </div>
                <LineChart 
                    data={monthViewMode === 'days' ? monthDaysData : monthWeeksData} 
                    title={t('Очки за месяц')} 
                    color="#2cd32c" 
                />
            </div>

            <LineChart 
                data={yearData} 
                title={t('Очки за год')} 
                color="#cc1e4a" 
            />
        </div>
    );
};