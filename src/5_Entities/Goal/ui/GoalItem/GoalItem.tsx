import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Checkbox } from '6_Shared/ui/Checkbox/Checkbox';
import { CollapseButton } from '6_Shared/ui/CollapseButton/CollapseButton';
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
    onToggleCollapsed: (id: string) => void;
}

export const GoalItem: FC<GoalItemProps> = (props) => {
    const {
        className,
        goal,
        onToggle,
        onSubgoalToggle,
        onMarkAsSent,
        onEdit,
        onDelete,
        onToggleCollapsed,
    } = props;

    const { t } = useTranslation('goals');
    const addTodo = useTodoStore((state) => state.addTodo);

    const hasSubgoals = goal.subgoals && goal.subgoals.length > 0;
    const activeSubgoals = goal.subgoals?.filter((s) => !s.isCompleted) || [];
    const completedSubgoals = goal.subgoals?.filter((s) => s.isCompleted) || [];

    const handleSendToTasks = (sub: Subgoal) => {
        addTodo({
            description: sub.description,
            points: sub.points || 0,
            priority: 'medium',
            type: 'task',
            subtasks: [],
            subgoalId: String(sub.id),
        });
        onMarkAsSent(goal.id, sub.id);
    };

    return (
        <div className={classNames(cls.GoalItem, { [cls.completed]: goal.isCompleted }, [className])}>
            <div className={cls.content}>
                <div className={cls.leftSide}>
                    <div className={cls.info}>
                        <Checkbox
                            checked={goal.isCompleted}
                            onChange={() => onToggle(goal.id)}
                            theme="primary"
                        />
                        <div>
                            <div className={cls.title}>{goal.title}</div>
                            {goal.description && <div className={cls.description}>{goal.description}</div>}
                        </div>
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

            {hasSubgoals && (
                <div className={cls.subgoalsList}>
                    {activeSubgoals.map((sub) => (
                        <div
                            key={sub.id}
                            className={cls.subgoalItem}
                        >
                            <div className={cls.subgoalInfo}>
                                <div
                                    className={cls.tooltipContainer}
                                    data-tooltip={sub.isSentToTasks ? t('tooltip_sent_to_tasks') : undefined}
                                    style={{ '--tooltip-color': 'var(--primary-color)' } as React.CSSProperties}
                                >
                                    <Checkbox
                                        checked={sub.isCompleted}
                                        onChange={() => onSubgoalToggle(goal.id, sub.id)}
                                        theme="primary"
                                        disabled={sub.isSentToTasks}
                                    />
                                </div>
                                <div className={cls.subgoalContent}>
                                    <div>
                                        <span>{sub.description}</span>
                                        <span className={cls.points}>
                                            (
                                            {sub.points}
                                            )
                                        </span>
                                    </div>
                                    {sub.details && <div className={cls.subgoalDetails}>{sub.details}</div>}
                                </div>
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
                                <span className={cls.sentBadge}>
                                    ✓
                                    {t('В задачах')}
                                </span>
                            )}
                        </div>
                    ))}

                    {completedSubgoals.length > 0 && (
                        <>
                            {activeSubgoals.length > 0 && <div className={cls.subgoalsSeparator} />}
                            <div
                                className={cls.completedSubgoalsHeader}
                                onClick={() => onToggleCollapsed?.(goal.id)}
                            >
                                <CollapseButton
                                    collapsed={Boolean(goal.isCompletedCollapsed)}
                                />
                                <span className={cls.completedSubgoalsTitle}>{t('completed_section') || 'Completed'}</span>
                            </div>

                            {!goal.isCompletedCollapsed && completedSubgoals.map((sub) => (
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
                                        <div className={cls.subgoalContent}>
                                            <div>
                                                <span>{sub.description}</span>
                                                <span className={cls.points}>
                                                    (
                                                    {sub.points}
                                                    )
                                                </span>
                                            </div>
                                            {sub.details && <div className={cls.subgoalDetails}>{sub.details}</div>}
                                        </div>
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
