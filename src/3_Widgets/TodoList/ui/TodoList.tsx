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
    const addAction = useScoreStore((state) => state.addAction);
    const removeAction = useScoreStore((state) => state.removeAction);

    const handleToggle = (id: string, isCompleted: boolean, points: number) => {
        if (isCompleted) {
            const todo = todos.find((t) => t.id === id);
            const actionId = Date.now().toString();
            addAction({
                id: actionId,
                text: `${t('Выполнена задача')}: ${todo?.description}`,
                points,
                isPenalty: false,
            });
            toggleTodo(id, actionId);
        } else {
            const todo = todos.find((t) => t.id === id);
            if (todo?.completedActionId) {
                removeAction(todo.completedActionId);
            }
            toggleTodo(id);
        }
    };

    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    const weeklyChallenges = activeTodos.filter((t) => t.type === 'weekly_challenge');
    const dailyChallenges = activeTodos.filter((t) => t.type === 'daily_challenge');
    const normalTasks = activeTodos.filter((t) => !t.type || t.type === 'task');

    if (todos.length === 0) {
        return <div className={classNames(cls.TodoList, {}, [className, cls.empty])}>{t('Список задач пуст')}</div>;
    }

    return (
        <div className={classNames(cls.TodoList, {}, [className])}>
            {weeklyChallenges.length > 0 && (
                <>
                    <div className={cls.sectionTitle}>{t('Челендж недели')}</div>
                    {weeklyChallenges.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            className={cls.item}
                            onToggle={handleToggle}
                            onSubtaskToggle={(subId) => toggleSubtask(todo.id, subId)}
                        />
                    ))}
                    {(dailyChallenges.length > 0 || normalTasks.length > 0) && <div className={cls.separator} />}
                </>
            )}

            {dailyChallenges.length > 0 && (
                <>
                    <div className={cls.sectionTitle}>{t('Челендж дня')}</div>
                    {dailyChallenges.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            className={cls.item}
                            onToggle={handleToggle}
                            onSubtaskToggle={(subId) => toggleSubtask(todo.id, subId)}
                        />
                    ))}
                    {normalTasks.length > 0 && <div className={cls.separator} />}
                </>
            )}

            {normalTasks.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    className={cls.item}
                    onToggle={handleToggle}
                    onSubtaskToggle={(subId) => toggleSubtask(todo.id, subId)}
                />
            ))}

            {completedTodos.length > 0 && (
                <>
                    <div className={cls.completedTitle}>{t('Выполненные')}</div>
                    <div className={cls.completedList}>
                        {completedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                className={cls.item}
                                onToggle={handleToggle}
                                onSubtaskToggle={(subId) => toggleSubtask(todo.id, subId)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
