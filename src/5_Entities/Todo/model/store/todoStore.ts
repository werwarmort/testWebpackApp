import { create } from 'zustand';
import { mutate } from 'swr';
import { $api } from '6_Shared/api/api';
import { TodoState, Todo } from '../types/todo';

export const useTodoStore = create<TodoState>((set, get) => ({
    todos: [] as Todo[],

    setTodos: (todos: Todo[]) => set({ todos }),

    fetchTodos: async () => {
        try {
            const response = await $api('/tasks');
            if (response.ok) {
                const data = await response.json();
                set({ todos: data });
                // синхронизируем с SWR если нужно
                mutate('/tasks', data, false);
            }
        } catch (e) {
            console.error('Failed to fetch tasks', e);
        }
    },

    addTodo: async (todoParams) => {
        try {
            const response = await $api('/tasks', {
                method: 'POST',
                body: JSON.stringify(todoParams),
            });
            if (response.ok) {
                await get().fetchTodos();
            }
        } catch (e) {
            console.error('Failed to add task', e);
        }
    },

    updateTodo: async (updatedTodo) => {
        try {
            // оптимистично обновляем SWR
            const currentTodos = get().todos;
            const nextTodos = currentTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
            mutate('/tasks', nextTodos, false);
            set({ todos: nextTodos });

            const response = await $api(`/tasks/${updatedTodo.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedTodo),
            });

            if (response.ok) {
                // после успеха можно обновить окончательно
                mutate('/tasks');
            }
        } catch (e) {
            console.error('Failed to update task', e);
            mutate('/tasks'); // Возвращаем стейт при ошибке
        }
    },

    toggleTodo: async (id, actionId) => {
        const todo = get().todos.find((t) => String(t.id) === String(id));
        if (!todo) return;

        const updatedTodo = {
            ...todo,
            isCompleted: !todo.isCompleted,
            completedActionId: !todo.isCompleted ? actionId : null,
            completedAt: !todo.isCompleted ? Date.now() : null,
        };

        await get().updateTodo(updatedTodo);
    },

    toggleSubtask: async (todoId, subtaskId, actionId) => {
        const todo = get().todos.find((t) => String(t.id) === String(todoId));
        if (!todo) return;

        const updatedTodo = {
            ...todo,
            subtasks: todo.subtasks?.map((sub) => {
                if (String(sub.id) === String(subtaskId)) {
                    const isNowCompleted = !sub.isCompleted;
                    return {
                        ...sub,
                        isCompleted: isNowCompleted,
                        completedActionId: isNowCompleted ? actionId : undefined,
                    };
                }
                return sub;
            }),
        };

        await get().updateTodo(updatedTodo);
    },

    toggleTodoCollapsed: async (id) => {
        const todo = get().todos.find((t) => String(t.id) === String(id));
        if (!todo) return;

        const updatedTodo = {
            ...todo,
            isCompletedCollapsed: !todo.isCompletedCollapsed,
        };

        await get().updateTodo(updatedTodo);
    },

    deleteTodo: async (id) => {
        try {
            const response = await $api(`/tasks/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                mutate('/tasks');
                await get().fetchTodos();
            }
        } catch (e) {
            console.error('Failed to delete task', e);
        }
    },
}));
