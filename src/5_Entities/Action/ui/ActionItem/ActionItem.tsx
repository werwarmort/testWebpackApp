import { FC } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Action } from '5_Entities/Score/model/types/score';
import cls from './ActionItem.module.scss';

interface ActionItemProps {
    className?: string;
    action: Action;
}

export const ActionItem: FC<ActionItemProps> = ({ className, action }) => {
    const date = new Date(action.createdAt).toLocaleDateString();

    return (
        <div className={classNames(cls.ActionItem, {}, [className])}>
            <div className={classNames(cls.points, { [cls.penalty]: action.isPenalty })}>
                {action.isPenalty ? '-' : '+'}{action.points}
            </div>
            <div className={cls.content}>
                <div className={cls.text}>{action.text}</div>
                <div className={cls.date}>{date}</div>
            </div>
        </div>
    );
};
