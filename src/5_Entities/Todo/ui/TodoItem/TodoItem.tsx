import { FC, useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Checkbox } from '6_Shared/ui/Checkbox/Checkbox';
import { CollapseButton } from '6_Shared/ui/CollapseButton/CollapseButton';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { Todo } from '../../model/types/todo';
import cls from './TodoItem.module.scss';
import { useTranslation } from 'react-i18next';

interface TodoItemProps {
    className?: string;
    todo: Todo;
    onToggle?: (id: string, isCompleted: boolean, points: number) => void;
    onSubtaskToggle?: (subtaskId: string) => void;
    onEdit?: (todo: Todo) => void;
    onDelete?: (id: string) => void;
    onToggleCollapsed?: (id: string) => void;
}

const isToday = (timestamp?: number) => {
    if (!timestamp) return false;
    const date = new Date(timestamp);
    const now = new Date();
    return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );
};

export const TodoItem: FC<TodoItemProps> = ({
    className,
    todo,
    onToggle,
    onSubtaskToggle,
    onEdit,
    onDelete,
    onToggleCollapsed,
}) => {
    const { t } = useTranslation('todo');

    const onToggleHandler = (checked: boolean) => {
        onToggle?.(todo.id, checked, todo.points);
    };

    const hasSubtasks = todo.subtasks && todo.subtasks.length > 0;
    const activeSubtasks = todo.subtasks?.filter(s => !s.isCompleted) || [];
    const completedSubtasks = todo.subtasks?.filter(s => s.isCompleted) || [];
    const isLocked = todo.isCompleted && todo.completedAt && !isToday(todo.completedAt);

    return (
        <div
            className={classNames(
                cls.TodoItem,
                { [cls.completed]: todo.isCompleted, [cls[todo.priority]]: true },
                [className],
            )}
        >
            <div className={cls.content}>
                <div className={cls.leftSide}>
                    <div className={cls.info}>
                        <Checkbox
                            checked={todo.isCompleted}
                            onChange={onToggleHandler}
                            theme="primary"
                            disabled={isLocked}
                        />
                        <div>
                            <div className={cls.description}>{todo.description}</div>
                            {todo.details && <div className={cls.details}>{todo.details}</div>}
                        </div>
                    </div>
                </div>

                <div className={cls.rightSide}>
                    {!todo.isCompleted && (
                        <div className={cls.actions}>
                            <div
                                className={cls.tooltipContainer}
                                data-tooltip={
                                    todo.subgoalId ? t('tooltip_linked_to_goal') : undefined
                                }
                            >
                                <Button
                                    className={classNames(cls.actionBtn, {
                                        [cls.disabled]: todo.subgoalId,
                                    })}
                                    theme={ThemeButton.CLEAR}
                                    onClick={() => !todo.subgoalId && onEdit?.(todo)}
                                    disabled={Boolean(todo.subgoalId)}
                                >
                                    ✎
                                </Button>
                            </div>
                            <Button
                                className={cls.actionBtn}
                                theme={ThemeButton.CLEAR}
                                onClick={() => onDelete?.(todo.id)}
                            >
                                ✖
                            </Button>
                        </div>
                    )}
                    <div className={cls.points}>+{todo.points}</div>
                </div>
            </div>
            
            {hasSubtasks && (
                <div className={cls.subtasksList}>
                    {activeSubtasks.map(subtask => (
                        <div key={subtask.id} className={cls.subtaskItem}>
                            <Checkbox
                                checked={subtask.isCompleted}
                                onChange={() => onSubtaskToggle?.(subtask.id)}
                                theme="primary"
                                variant="round"
                                disabled={todo.isCompleted}
                            />
                            <div className={cls.subtaskContent}>
                                <div>{subtask.description}</div>
                                {subtask.details && <div className={cls.subtaskDetails}>{subtask.details}</div>}
                            </div>
                        </div>
                    ))}

                    {completedSubtasks.length > 0 && (
                        <>
                            {activeSubtasks.length > 0 && <div className={cls.subtasksSeparator} />}
                            <div 
                                className={cls.completedSubtasksHeader}
                                onClick={() => onToggleCollapsed?.(todo.id)}
                            >
                                <CollapseButton
                                    collapsed={Boolean(todo.isCompletedCollapsed)}
                                    onClick={() => onToggleCollapsed?.(todo.id)}
                                />
                                <span className={cls.completedSubtasksTitle}>{t('completed_section')}</span>
                            </div>
                            
                            {!todo.isCompletedCollapsed && completedSubtasks.map(subtask => (
                                <div
                                    key={subtask.id}
                                    className={classNames(cls.subtaskItem, {
                                        [cls.subtaskCompleted]: subtask.isCompleted,
                                    })}
                                >
                                    <Checkbox
                                        checked={subtask.isCompleted}
                                        onChange={() => onSubtaskToggle?.(subtask.id)}
                                        theme="primary"
                                        variant="round"
                                        disabled={todo.isCompleted}
                                    />
                                    <div className={cls.subtaskContent}>
                                        <div>{subtask.description}</div>
                                        {subtask.details && <div className={cls.subtaskDetails}>{subtask.details}</div>}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
