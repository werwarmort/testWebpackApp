import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { TodoItem } from '5_Entities/Todo/ui/TodoItem/TodoItem';
import cls from './TodoList.module.scss';

interface TodoListProps {
    className?: string;
}

export const TodoList: FC<TodoListProps> = ({ className }) => {
    const { t } = useTranslation();
    const todos = useTodoStore((state) => state.todos);
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const toggleSubtask = useTodoStore((state) => state.toggleSubtask);
    const addPoints = useScoreStore((state) => state.addPoints);

    const handleToggle = (id: string, isCompleted: boolean, points: number) => {
        toggleTodo(id);
        addPoints(isCompleted ? points : -points);
    };

    if (todos.length === 0) {
        return <div className={classNames(cls.TodoList, {}, [className, cls.empty])}>{t('Список задач пуст')}</div>;
    }

    return (
        <div className={classNames(cls.TodoList, {}, [className])}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    className={cls.item}
                    onToggle={handleToggle}
                    onSubtaskToggle={(subId) => toggleSubtask(todo.id, subId)}
                />
            ))}
        </div>
    );
};
