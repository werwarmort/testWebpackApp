import useSWR, { mutate as globalMutate } from 'swr';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AddGoalForm } from '4_Features/AddGoalForm';
import { GoalList } from '3_Widgets/GoalList';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { useGoalStore } from '5_Entities/Goal';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import cls from './GoalsPage.module.scss';

const GoalsPage: FC = () => {
    const { t } = useTranslation('goals');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: goals, mutate } = useSWR('/goals', swrFetcher);
    const setGoals = useGoalStore(state => state.setGoals);

    useEffect(() => {
        if (goals) {
            setGoals(goals);
        }
    }, [goals, setGoals]);

    const onUpdate = () => {
        mutate();
        globalMutate('/actions/score'); // Обновляем счет в Navbar
    };

    const onShowModal = () => setIsModalOpen(true);
    const onCloseModal = () => {
        setIsModalOpen(false);
        onUpdate();
    };

    return (
        <div className={classNames(cls.GoalsPage, {}, [])}>
            <div className={cls.header}>
                <CircleButton onClick={onShowModal}>+</CircleButton>
            </div>
            <GoalList onUpdate={onUpdate} />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddGoalForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default GoalsPage;
