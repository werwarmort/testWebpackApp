import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import { useScoreStore } from '5_Entities/Score';
import { TodoItem } from '5_Entities/Todo/ui/TodoItem/TodoItem';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { AddTodoForm } from '4_Features/AddTodoForm/ui/AddTodoForm';
import { Todo } from '5_Entities/Todo/model/types/todo';
import cls from './TodoList.module.scss';

interface TodoListProps {
    className?: string;
    onUpdate?: () => void;
}

export const TodoList: FC<TodoListProps> = ({ className, onUpdate }) => {
    const { t } = useTranslation('todo');
    const todos = useTodoStore((state) => state.todos);
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const toggleSubtask = useTodoStore((state) => state.toggleSubtask);
    const deleteTodo = useTodoStore((state) => state.deleteTodo);
    const addAction = useScoreStore((state) => state.addAction);
    const removeAction = useScoreStore((state) => state.removeAction);

    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);

    const handleToggle = async (id: string, isCompleted: boolean, points: number) => {
        // Находим свежую версию задачи из текущего списка
        const todo = todos.find((t) => String(t.id) === String(id));
        if (!todo) return;

        if (isCompleted) {
            // Если мы отмечаем как выполненное
            const actionId = Date.now().toString();
            
            // Сначала добавляем запись в счет
            await addAction({
                id: actionId,
                text: `${t('task_completed_log')}: ${todo.description}`,
                points,
                isPenalty: false,
                todoId: String(id),
            });
            
            // Затем обновляем саму задачу с привязкой к этой записи
            await toggleTodo(id, actionId);
        } else {
            // Если мы снимаем отметку о выполнении
            if (todo.completedActionId) {
                await removeAction(todo.completedActionId);
            }
            await toggleTodo(id);
        }
        
        // Магический вызов SWR для обновления всех данных на странице
        onUpdate?.();
    };

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
    };

    const handleDelete = async (id: string) => {
        await deleteTodo(id);
        onUpdate?.();
    };

    const handleSubtaskToggle = async (subId: string, todoId: string) => {
        await toggleSubtask(todoId, subId);
        onUpdate?.();
    };

    const activeTodos = todos.filter((todo) => !todo.isCompleted);
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    const weeklyChallenges = activeTodos.filter((t) => t.type === 'weekly_challenge');
    const dailyChallenges = activeTodos.filter((t) => t.type === 'daily_challenge');
    const normalTasks = activeTodos.filter((t) => !t.type || t.type === 'task');

    if (todos.length === 0) {
        return <div className={classNames(cls.TodoList, {}, [className, cls.empty])}>{t('empty_list')}</div>;
    }

    return (
        <div className={classNames(cls.TodoList, {}, [className])}>
            {weeklyChallenges.length > 0 && (
                <>
                    <div className={cls.sectionTitle}>{t('type_weekly')}</div>
                    {weeklyChallenges.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            className={cls.item}
                            onToggle={handleToggle}
                            onSubtaskToggle={(subId) => handleSubtaskToggle(subId, todo.id)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                    {(dailyChallenges.length > 0 || normalTasks.length > 0) && <div className={cls.separator} />}
                </>
            )}

            {dailyChallenges.length > 0 && (
                <>
                    <div className={cls.sectionTitle}>{t('type_daily')}</div>
                    {dailyChallenges.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            className={cls.item}
                            onToggle={handleToggle}
                            onSubtaskToggle={(subId) => handleSubtaskToggle(subId, todo.id)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
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
                    onSubtaskToggle={(subId) => handleSubtaskToggle(subId, todo.id)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}

            {completedTodos.length > 0 && (
                <>
                    <div 
                        className={cls.completedHeader} 
                        onClick={() => setIsCompletedCollapsed(prev => !prev)}
                    >
                        <div className={classNames(cls.collapseBtn, { [cls.collapsedIcon]: isCompletedCollapsed })}>
                            ▼
                        </div>
                        <div className={cls.completedTitle}>{t('completed_section')}</div>
                    </div>
                    
                    {!isCompletedCollapsed && (
                        <div className={cls.completedList}>
                            {completedTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    className={cls.item}
                                    onToggle={handleToggle}
                                    onSubtaskToggle={(subId) => handleSubtaskToggle(subId, todo.id)}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            <Modal isOpen={Boolean(editingTodo)} onClose={() => setEditingTodo(null)}>
                {editingTodo && (
                    <AddTodoForm
                        initialData={editingTodo}
                        onSuccess={() => {
                            setEditingTodo(null);
                            onUpdate?.();
                        }}
                    />
                )}
            </Modal>
        </div>
    );
};