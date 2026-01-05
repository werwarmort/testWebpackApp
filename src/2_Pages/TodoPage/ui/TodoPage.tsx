import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { CircleButton } from '6_Shared/ui/CircleButton/CircleButton';
import { AddTodoForm } from '4_Features/AddTodoForm/ui/AddTodoForm';
import { TodoList } from '3_Widgets/TodoList/ui/TodoList';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import styles from './TodoPage.module.scss';

const TodoPage = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Используем SWR для получения данных
    const { data: todos, mutate } = useSWR('/tasks', swrFetcher);
    const setTodos = useTodoStore(state => state.setTodos);

    useEffect(() => {
        if (todos) {
            setTodos(todos);
        }
    }, [todos, setTodos]);

    const onShowModal = () => setIsModalOpen(true);
    const onCloseModal = () => {
        setIsModalOpen(false);
        mutate();
    };

    return (
        <div className={classNames(styles.TodoPageRoot, {}, [])}>
            <div className={styles.header}>
                <CircleButton onClick={onShowModal}>+</CircleButton>
            </div>

            <TodoList onUpdate={mutate} />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddTodoForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default TodoPage;