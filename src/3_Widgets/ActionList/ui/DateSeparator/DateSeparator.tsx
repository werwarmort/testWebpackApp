import { memo } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import cls from './DateSeparator.module.scss';

interface DateSeparatorProps {
    className?: string;
    date: Date;
    totalPoints: number;
}

export const DateSeparator = memo(({ className, date, totalPoints }: DateSeparatorProps) => {
    // Форматируем дату локально
    const dateString = date.toLocaleDateString();
    const isPositive = totalPoints >= 0;

    return (
        <div className={classNames(cls.DateSeparator, {}, [className])}>
            <div className={cls.line} />
            <div className={cls.content}>
                <span className={cls.date}>{dateString}</span>
                <span className={classNames(cls.points, { [cls.negative]: !isPositive })}>
                    {isPositive ? '+' : ''}{totalPoints}
                </span>
            </div>
            <div className={cls.line} />
        </div>
    );
});
