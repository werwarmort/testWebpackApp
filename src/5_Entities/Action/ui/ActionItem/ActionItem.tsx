import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Action } from '5_Entities/Score/model/types/score';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import cls from './ActionItem.module.scss';

interface ActionItemProps {
    className?: string;
    action: Action;
    onEdit?: (action: Action) => void;
    onDelete?: (id: string) => void;
}

const isDateToday = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );
};

export const ActionItem: FC<ActionItemProps> = ({ className, action, onEdit, onDelete }) => {
    const { t } = useTranslation();
    const date = new Date(action.createdAt).toLocaleDateString();
    
    const isTodoAction = Boolean(action.todoId);
    const isPastAction = !isDateToday(action.createdAt);
    const isLocked = isTodoAction || isPastAction;

    let tooltipText: string | undefined;
    if (isTodoAction) {
        tooltipText = t('Редактирование доступно со страницы "Дела"');
    } else if (isPastAction) {
        tooltipText = t('История прошлых дней не редактируется');
    }

    return (
        <div className={classNames(cls.ActionItem, {}, [className])}>
            <div className={classNames(cls.points, { [cls.penalty]: action.isPenalty })}>
                {action.isPenalty ? '-' : '+'}{action.points}
            </div>
            <div className={cls.content}>
                <div className={cls.info}>
                    <div className={cls.text}>{action.text}</div>
                    <div className={cls.date}>{date}</div>
                </div>
                <div className={cls.actions}>
                    <div className={cls.tooltipContainer} data-tooltip={tooltipText}>
                        <Button
                            className={classNames(cls.actionBtn, { [cls.disabled]: isLocked })}
                            theme={ThemeButton.CLEAR}
                            onClick={() => !isLocked && onEdit?.(action)}
                            disabled={isLocked}
                        >
                            ✎
                        </Button>
                    </div>
                    <div className={cls.tooltipContainer} data-tooltip={tooltipText}>
                        <Button
                            className={classNames(cls.actionBtn, { [cls.disabled]: isLocked })}
                            theme={ThemeButton.CLEAR}
                            onClick={() => !isLocked && onDelete?.(action.id)}
                            disabled={isLocked}
                        >
                            ✖
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
