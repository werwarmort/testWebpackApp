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

    if (goals.length === 0) {
        return <div className={classNames(cls.GoalList, {}, [className, cls.empty])}>{t('Список целей пуст')}</div>;
    }

    return (
        <div className={classNames(cls.GoalList, {}, [className])}>
            {goals.map((goal) => (
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
