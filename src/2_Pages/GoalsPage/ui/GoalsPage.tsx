import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { AddGoalForm } from '4_Features/AddGoalForm';
import { GoalList } from '3_Widgets/GoalList';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { Modal } from '6_Shared/ui/Modal/Modal';
import cls from './GoalsPage.module.scss';

const GoalsPage: FC = () => {
    const { t } = useTranslation('goals');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onShowModal = () => setIsModalOpen(true);
    const onCloseModal = () => setIsModalOpen(false);

    return (
        <div className={classNames(cls.GoalsPage, {}, [])}>
            <div className={cls.header}>
                <h1>{t('page_title')}</h1>
                <CircleButton onClick={onShowModal}>+</CircleButton>
            </div>
            <GoalList />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddGoalForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default GoalsPage;
