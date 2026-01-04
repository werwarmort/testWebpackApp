import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { Button, ThemeButton } from '6_Shared/ui/Button/Button';
import { AddActionForm } from '4_Features/AddActionForm/ui/AddActionForm';
import { ActionList } from '3_Widgets/ActionList/ui/ActionList';
import { useScoreStore } from '5_Entities/Score/model/store/scoreStore';
import styles from './MainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const points = useScoreStore(state => state.points);

    const onShowModal = () => {
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.MainPageRoot}>
            <div className={styles.header}>
                <Button onClick={onShowModal} theme={ThemeButton.CLEAR} className={styles.addBtn}>
                    +
                </Button>
            </div>

            <ActionList />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddActionForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default MainPage;
