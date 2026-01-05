import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Checkbox } from '6_Shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import { Goal, Subgoal } from '../../model/types/goal';
import cls from './GoalItem.module.scss';

interface GoalItemProps {
    className?: string;
    goal: Goal;
    onToggle: (id: string) => void;
    onSubgoalToggle: (goalId: string, subId: string) => void;
    onMarkAsSent: (goalId: string, subId: string) => void;
    onEdit: (goal: Goal) => void;
    onDelete: (id: string) => void;
}

export const GoalItem: FC<GoalItemProps> = (props) => {
    const {
        className,
        goal,
        onToggle,
        onSubgoalToggle,
        onMarkAsSent,
        onEdit,
        onDelete
    } = props;
    
    const { t } = useTranslation('goals');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const addTodo = useTodoStore(state => state.addTodo);

    const hasSubgoals = goal.subgoals && goal.subgoals.length > 0;

    const handleSendToTasks = (sub: Subgoal) => {
        addTodo({
            description: sub.description,
            points: 10, // Дефолтные баллы для целей
            priority: 'medium',
            type: 'task',
            subtasks: []
        });
        onMarkAsSent(goal.id, sub.id);
    };

    return (
        <div className={classNames(cls.GoalItem, { [cls.completed]: goal.isCompleted }, [className])}>
            <div className={cls.content}>
                <div className={cls.leftSide}>
                    <div className={cls.info}>
                        {hasSubgoals && (
                            <Button
                                theme={ThemeButton.CLEAR}
                                className={classNames(cls.collapseBtn, { [cls.collapsedIcon]: isCollapsed })}
                                onClick={() => setIsCollapsed((prev) => !prev)}
                            >
                                ▼
                            </Button>
                        )}
                        <Checkbox
                            checked={goal.isCompleted}
                            onChange={() => onToggle(goal.id)}
                            theme="primary"
                        />
                        <div className={cls.title}>{goal.title}</div>
                    </div>
                </div>

                <div className={cls.rightSide}>
                    <div className={cls.actions}>
                        <Button className={cls.actionBtn} theme={ThemeButton.CLEAR} onClick={() => onEdit(goal)}>
                            ✎
                        </Button>
                        <Button className={cls.actionBtn} theme={ThemeButton.CLEAR} onClick={() => onDelete(goal.id)}>
                            ✖
                        </Button>
                    </div>
                </div>
            </div>

            {hasSubgoals && !isCollapsed && (
                <div className={cls.subgoalsList}>
                    {goal.subgoals.map((sub) => (
                        <div
                            key={sub.id}
                            className={classNames(cls.subgoalItem, { [cls.subgoalCompleted]: sub.isCompleted })}
                        >
                            <div className={cls.subgoalInfo}>
                                <Checkbox
                                    checked={sub.isCompleted}
                                    onChange={() => onSubgoalToggle(goal.id, sub.id)}
                                    theme="primary"
                                />
                                <span>{sub.description}</span>
                            </div>
                            
                            {!sub.isSentToTasks && !sub.isCompleted && (
                                <Button
                                    theme={ThemeButton.CLEAR}
                                    className={cls.sendBtn}
                                    onClick={() => handleSendToTasks(sub)}
                                    title={t('Отправить в задачи')}
                                >
                                    🚀
                                </Button>
                            )}
                            {sub.isSentToTasks && (
                                <span className={cls.sentBadge}>✓ {t('В задачах')}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
