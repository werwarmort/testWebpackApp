import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { ActionItem } from '5_Entities/Action/ui/ActionItem/ActionItem';
import { Action } from '5_Entities/Score/model/types/score';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { AddActionForm } from '4_Features/AddActionForm/ui/AddActionForm';
import { DateSeparator } from './DateSeparator/DateSeparator';
import cls from './ActionList.module.scss';

interface ActionListProps {
    className?: string;
    onUpdate?: () => void;
}

export const ActionList: FC<ActionListProps> = ({ className, onUpdate }) => {
    const { t } = useTranslation('score');
    const actions = useScoreStore(state => state.actions);
    const removeAction = useScoreStore(state => state.removeAction);
    const [editingAction, setEditingAction] = useState<Action | null>(null);

    const groups = useMemo(() => {
        const groupsList: { dateKey: string; date: Date; total: number; actions: Action[] }[] = [];

        actions.forEach(action => {
            const date = new Date(action.createdAt);
            const dateKey = date.toLocaleDateString();

            let group = groupsList.find(g => g.dateKey === dateKey);
            if (!group) {
                group = {
                    dateKey,
                    date,
                    total: 0,
                    actions: [],
                };
                groupsList.push(group);
            }

            group.actions.push(action);
            const points = action.isPenalty ? -action.points : action.points;
            group.total += points;
        });

        // сначала самые свежие даты
        return groupsList.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [actions]);

    const handleEdit = (action: Action) => {
        setEditingAction(action);
    };

    const handleDelete = async (id: string) => {
        await removeAction(id);
        onUpdate?.();
    };

    if (actions.length === 0) {
        return (
            <div className={classNames(cls.ActionList, {}, [className, cls.empty])}>
                {t('empty_list')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ActionList, {}, [className])}>
            {groups.map(group => (
                <div key={group.dateKey} className={cls.group}>
                    <DateSeparator date={group.date} totalPoints={group.total} />
                    {group.actions.map(action => (
                        <ActionItem
                            key={action.id}
                            action={action}
                            className={cls.item}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ))}

            <Modal isOpen={Boolean(editingAction)} onClose={() => setEditingAction(null)}>
                {editingAction && (
                    <AddActionForm
                        initialData={editingAction}
                        onSuccess={() => {
                            setEditingAction(null);
                            onUpdate?.();
                        }}
                    />
                )}
            </Modal>
        </div>
    );
};
