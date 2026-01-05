import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { AddActionForm } from '4_Features/AddActionForm/ui/AddActionForm';
import { ActionList } from '3_Widgets/ActionList/ui/ActionList';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import styles from './ScorePage.module.scss';

const ScorePage = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dayPoints = useScoreStore(state => state.dayPoints);

    const onShowModal = () => {
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.ScorePageRoot}>
            <div className={styles.header}>
                {/* <div className={styles.totalScore}>*/}
                {/*    {t('Баллы за день')}: {dayPoints}*/}
                {/*</div>*/}
                <CircleButton onClick={onShowModal}>+</CircleButton>
            </div>

            <ActionList />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddActionForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default ScorePage;
