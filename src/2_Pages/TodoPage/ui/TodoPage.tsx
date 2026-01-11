import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR, { mutate as globalMutate } from 'swr';
import { classNames } from '6_Shared/lib/classNames/classNames';
import { Modal } from '6_Shared/ui/Modal/Modal';
import { AddFloatingButton } from '6_Shared/ui/AddFloatingButton';
import { AddTodoForm } from '4_Features/AddTodoForm/ui/AddTodoForm';
import { TodoList } from '3_Widgets/TodoList/ui/TodoList';
import { swrFetcher } from '6_Shared/api/swrFetcher';
import { useTodoStore } from '5_Entities/Todo/model/store/todoStore';
import styles from './TodoPage.module.scss';

const TodoPage = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { data: todos, mutate } = useSWR('/tasks', swrFetcher);
    const setTodos = useTodoStore(state => state.setTodos);

    useEffect(() => {
        if (todos) {
            setTodos(todos);
        }
    }, [todos, setTodos]);

    const onUpdate = () => {
        mutate();
        globalMutate('/actions/score');
    };

    const onShowModal = () => setIsModalOpen(true);
    const onCloseModal = () => {
        setIsModalOpen(false);
        onUpdate();
    };

    return (
        <div className={classNames(styles.TodoPageRoot, {}, [])}>
            <AddFloatingButton onClick={onShowModal} />

            <TodoList onUpdate={onUpdate} />

            <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                <AddTodoForm onSuccess={onCloseModal} />
            </Modal>
        </div>
    );
};

export default TodoPage;
