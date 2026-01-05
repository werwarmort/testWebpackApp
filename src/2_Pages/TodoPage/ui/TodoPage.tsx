import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { AddTodoForm } from '4_Features/AddTodoForm/ui/AddTodoForm';
import { TodoList } from '3_Widgets/TodoList/ui/TodoList';
import styles from './TodoPage.module.scss';

const TodoPage = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onShowModal = () => {
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.TodoPageRoot}>
            <div className={styles.header}>
                <div className={styles.title}>{t('Список дел')}</div>
                <CircleButton onClick={onShowModal}>
                    +
                </CircleButton>
            </div>

            <TodoList />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddTodoForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default TodoPage;