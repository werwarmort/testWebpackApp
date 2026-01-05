import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useGoalStore } from '5_Entities/Goal';
import { GoalItem } from '5_Entities/Goal/ui/GoalItem/GoalItem';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { AddGoalForm } from '4_Features/AddGoalForm';
import { Goal } from '5_Entities/Goal/model/types/goal';
import cls from './GoalList.module.scss';

interface GoalListProps {
    className?: string;
}

export const GoalList: FC<GoalListProps> = ({ className }) => {
    const { t } = useTranslation('goals');
    const goals = useGoalStore((state) => state.goals);
    const toggleGoal = useGoalStore((state) => state.toggleGoal);
    const toggleSubgoal = useGoalStore((state) => state.toggleSubgoal);
    const markSubgoalAsSent = useGoalStore((state) => state.markSubgoalAsSent);
    const deleteGoal = useGoalStore((state) => state.deleteGoal);

    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);

    if (goals.length === 0) {
        return <div className={classNames(cls.GoalList, {}, [className, cls.empty])}>{t('Список целей пуст')}</div>;
    }

    const activeGoals = goals.filter((goal) => !goal.isCompleted);
    const completedGoals = goals.filter((goal) => goal.isCompleted);

    return (
        <div className={classNames(cls.GoalList, {}, [className])}>
            {activeGoals.map((goal) => (
                <GoalItem
                    key={goal.id}
                    goal={goal}
                    onToggle={toggleGoal}
                    onSubgoalToggle={toggleSubgoal}
                    onMarkAsSent={markSubgoalAsSent}
                    onEdit={setEditingGoal}
                    onDelete={deleteGoal}
                />
            ))}

            {completedGoals.length > 0 && (
                <>
                    <div className={cls.separator} />
                    <div 
                        className={cls.completedHeader} 
                        onClick={() => setIsCompletedCollapsed(prev => !prev)}
                    >
                        <div className={classNames(cls.collapseBtn, { [cls.collapsedIcon]: isCompletedCollapsed })}>
                            ▼
                        </div>
                        <div className={cls.completedTitle}>{t('Выполненные')}</div>
                    </div>
                    
                    {!isCompletedCollapsed && (
                        <div className={cls.completedList}>
                            {completedGoals.map((goal) => (
                                <GoalItem
                                    key={goal.id}
                                    goal={goal}
                                    onToggle={toggleGoal}
                                    onSubgoalToggle={toggleSubgoal}
                                    onMarkAsSent={markSubgoalAsSent}
                                    onEdit={setEditingGoal}
                                    onDelete={deleteGoal}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            <Modal isOpen={Boolean(editingGoal)} onClose={() => setEditingGoal(null)}>
                {editingGoal && (
                    <AddGoalForm
                        initialData={editingGoal}
                        onSuccess={() => setEditingGoal(null)}
                    />
                )}
            </Modal>
        </div>
    );
};
