import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useGoalStore } from '5_Entities/Goal';
import { useScoreStore } from '5_Entities/Score';
import { GoalItem } from '5_Entities/Goal/ui/GoalItem/GoalItem';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { AddGoalForm } from '4_Features/AddGoalForm';
import { CollapseButton } from '6_Shared/ui/CollapseButton/CollapseButton';
import { Goal } from '5_Entities/Goal/model/types/goal';
import cls from './GoalList.module.scss';

interface GoalListProps {
    className?: string;
    onUpdate?: () => void;
}

export const GoalList: FC<GoalListProps> = ({ className, onUpdate }) => {
    const { t } = useTranslation('goals');
    const goals = useGoalStore((state) => state.goals);
    const toggleGoal = useGoalStore((state) => state.toggleGoal);
    const toggleSubgoal = useGoalStore((state) => state.toggleSubgoal);
    const markSubgoalAsSent = useGoalStore((state) => state.markSubgoalAsSent);
    const deleteGoal = useGoalStore((state) => state.deleteGoal);
    
    const addAction = useScoreStore((state) => state.addAction);
    const removeAction = useScoreStore((state) => state.removeAction);

    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);

    const handleGoalToggle = async (id: string) => {
        await toggleGoal(id);
        onUpdate?.();
    };

    const handleSubgoalToggle = async (goalId: string, subgoalId: string) => {
        const goal = goals.find(g => String(g.id) === String(goalId));
        const sub = goal?.subgoals.find(s => String(s.id) === String(subgoalId));
        
        if (!sub) return;

        if (!sub.isCompleted) {
            const actionId = Date.now().toString();
            await addAction({
                id: actionId,
                text: `${t('Выполнена подцель')}: ${sub.description}`,
                points: sub.points,
                isPenalty: false,
            });
            await toggleSubgoal(goalId, subgoalId, actionId);
        } else {
            if (sub.completedActionId) {
                await removeAction(sub.completedActionId);
            }
            await toggleSubgoal(goalId, subgoalId);
        }
        onUpdate?.();
    };

    const handleMarkAsSent = async (goalId: string, subgoalId: string) => {
        await markSubgoalAsSent(goalId, subgoalId);
        onUpdate?.();
    };

    const handleDelete = async (id: string) => {
        await deleteGoal(id);
        onUpdate?.();
    };

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
                    onToggle={handleGoalToggle}
                    onSubgoalToggle={handleSubgoalToggle}
                    onMarkAsSent={handleMarkAsSent}
                    onEdit={setEditingGoal}
                    onDelete={handleDelete}
                />
            ))}

            {completedGoals.length > 0 && (
                <>
                    <div className={cls.separator} />
                    <div 
                        className={cls.completedHeader} 
                        onClick={() => setIsCompletedCollapsed(prev => !prev)}
                    >
                        <CollapseButton 
                            className={cls.collapseBtn} 
                            collapsed={isCompletedCollapsed} 
                        />
                        <div className={cls.completedTitle}>{t('Выполненные')}</div>
                    </div>
                    
                    {!isCompletedCollapsed && (
                        <div className={cls.completedList}>
                            {completedGoals.map((goal) => (
                                <GoalItem
                                    key={goal.id}
                                    goal={goal}
                                    onToggle={handleGoalToggle}
                                    onSubgoalToggle={handleSubgoalToggle}
                                    onMarkAsSent={handleMarkAsSent}
                                    onEdit={setEditingGoal}
                                    onDelete={handleDelete}
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
                        onSuccess={() => {
                            setEditingGoal(null);
                            onUpdate?.();
                        }}
                    />
                )}
            </Modal>
        </div>
    );
};
