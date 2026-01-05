import { FC, useState } from 'react';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Checkbox } from '6_Shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { Todo } from '../../model/types/todo';
import cls from './TodoItem.module.scss';

interface TodoItemProps {
    className?: string;
    todo: Todo;
    onToggle?: (id: string, isCompleted: boolean, points: number) => void;
    onSubtaskToggle?: (subtaskId: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ className, todo, onToggle, onSubtaskToggle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onToggleHandler = (checked: boolean) => {
        onToggle?.(todo.id, checked, todo.points);
    };

    const hasSubtasks = todo.subtasks && todo.subtasks.length > 0;

    return (
        <div className={classNames(cls.TodoItem, { [cls.completed]: todo.isCompleted, [cls[todo.priority]]: true }, [className])}>
            <div className={cls.content}>
                <div className={cls.info}>
                    {hasSubtasks && (
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={classNames(cls.collapseBtn, { [cls.collapsedIcon]: isCollapsed })}
                            onClick={() => setIsCollapsed((prev) => !prev)}
                        >
                            ▼
                        </Button>
                    )}
                    <Checkbox checked={todo.isCompleted} onChange={onToggleHandler} theme="primary" />
                    <div className={cls.description}>{todo.description}</div>
                </div>
                <div className={cls.points}>+{todo.points}</div>
            </div>
            {hasSubtasks && !isCollapsed && (
                <div className={cls.subtasksList}>
                    {todo.subtasks?.map((subtask) => (
                        <div
                            key={subtask.id}
                            className={classNames(cls.subtaskItem, { [cls.subtaskCompleted]: subtask.isCompleted })}
                        >
                            <Checkbox
                                checked={subtask.isCompleted}
                                onChange={() => onSubtaskToggle?.(subtask.id)}
                                theme="primary"
                                variant="round"
                            />
                            <span>{subtask.description}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
