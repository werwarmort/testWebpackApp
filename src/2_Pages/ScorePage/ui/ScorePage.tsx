import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { AddActionForm } from '4_Features/AddActionForm/ui/AddActionForm';
import { ActionList } from '3_Widgets/ActionList/ui/ActionList';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import styles from './ScorePage.module.scss';

const ScorePage = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Загружаем список действий
    const { data: actions, mutate } = useSWR('/actions', swrFetcher);
    const setActions = useScoreStore(state => state.setActions);

    useEffect(() => {
        if (actions) {
            setActions(actions);
        }
    }, [actions, setActions]);

    const onShowModal = () => {
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        mutate();
    };

    return (
        <div className={styles.ScorePageRoot}>
            <div className={styles.header}>
                <CircleButton onClick={onShowModal}>+</CircleButton>
            </div>

            <ActionList onUpdate={mutate} />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddActionForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default ScorePage;
